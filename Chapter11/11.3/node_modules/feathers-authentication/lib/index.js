'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = auth;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _hooks = require('./hooks');

var _hooks2 = _interopRequireDefault(_hooks);

var _token = require('./services/token');

var _token2 = _interopRequireDefault(_token);

var _local = require('./services/local');

var _local2 = _interopRequireDefault(_local);

var _oauth = require('./services/oauth2');

var _oauth2 = _interopRequireDefault(_oauth);

var _middleware = require('./middleware');

var middleware = _interopRequireWildcard(_middleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObject(item) {
  return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item) && item !== null;
}

var debug = (0, _debug2.default)('feathers-authentication:main');
var PROVIDERS = {
  token: _token2.default,
  local: _local2.default
};

// Options that apply to any provider
var defaults = {
  idField: '_id',
  shouldSetupSuccessRoute: true,
  shouldSetupFailureRoute: true,
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure',
  tokenEndpoint: '/auth/token',
  localEndpoint: '/auth/local',
  userEndpoint: '/users',
  header: 'authorization',
  cookie: {
    name: 'feathers-jwt',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production'
  }
};

function auth() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function () {
    var app = this;
    var _super = app.setup;

    // NOTE (EK): Currently we require token based auth so
    // if the developer didn't provide a config for our token
    // provider then we'll set up a sane default for them.
    if (!config.token) {
      config.token = {
        secret: _crypto2.default.randomBytes(64).toString('base64')
      };
    }

    // If they didn't pass in a local provider let's set one up
    // for them with the default options.
    if (config.local === undefined) {
      config.local = {};
    }

    if (config.cookie) {
      config.cookie = Object.assign({}, defaults.cookie, config.cookie);
    }

    // Merge and flatten options
    var authOptions = Object.assign({}, defaults, app.get('auth'), config);

    // If a custom success redirect is passed in or it is disabled then we
    // won't setup the default route handler.
    if (authOptions.successRedirect !== defaults.successRedirect) {
      authOptions.shouldSetupSuccessRoute = false;
    }

    // If a custom failure redirect is passed in or it is disabled then we
    // won't setup the default route handler.
    if (authOptions.failureRedirect !== defaults.failureRedirect) {
      authOptions.shouldSetupFailureRoute = false;
    }

    // Set the options on the app
    app.set('auth', authOptions);

    // REST middleware
    if (app.rest) {
      debug('registering REST authentication middleware');
      // Make the Passport user available for REST services.
      // app.use( middleware.exposeAuthenticatedUser() );

      // Get the token and expose it to REST services.
      app.use(middleware.normalizeAuthToken(authOptions));
    }

    app.use(_passport2.default.initialize());

    app.setup = function () {
      var result = _super.apply(this, arguments);

      // Socket.io middleware
      if (app.io) {
        debug('registering Socket.io authentication middleware');
        app.io.on('connection', middleware.setupSocketIOAuthentication(app, authOptions));
      }

      // Primus middleware
      if (app.primus) {
        debug('registering Primus authentication middleware');
        app.primus.on('connection', middleware.setupPrimusAuthentication(app, authOptions));
      }

      return result;
    };

    // Merge all of our options and configure the appropriate service
    Object.keys(config).forEach(function (key) {

      // Because we are iterating through all the keys we might
      // be dealing with a config param and not a provider config
      // If that's the case we don't need to merge params and we
      // shouldn't try to set up a service for this key.
      if (!isObject(config[key]) || key === 'cookie') {
        return;
      }

      // Check to see if the key is a local or token provider
      var provider = PROVIDERS[key];
      var providerOptions = config[key];

      // If it's not one of our own providers then determine whether it is oauth1 or oauth2
      if (!provider && isObject(providerOptions)) {
        // Check to see if it is an oauth2 provider
        if (providerOptions.clientID && providerOptions.clientSecret) {
          provider = _oauth2.default;
        }
        // Check to see if it is an oauth1 provider
        else if (providerOptions.consumerKey && providerOptions.consumerSecret) {
            throw new Error('Sorry we don\'t support OAuth1 providers right now. Try using a ' + key + ' OAuth2 provider.');
          }

        providerOptions = Object.assign({ provider: key, endPoint: '/auth/' + key }, providerOptions);
      }

      var options = Object.assign({}, authOptions, providerOptions);

      app.configure(provider(options));
    });

    // Register error handling middleware for redirecting to support
    // redirecting on authentication failure.
    app.use(middleware.failedLogin(authOptions));

    // Setup route handler for default success redirect
    if (authOptions.shouldSetupSuccessRoute) {
      debug('Setting up successRedirect route: ' + authOptions.successRedirect);

      app.get(authOptions.successRedirect, function (req, res) {
        res.sendFile(_path2.default.resolve(__dirname, 'public', 'auth-success.html'));
      });
    }

    // Setup route handler for default failure redirect
    if (authOptions.shouldSetupFailureRoute) {
      debug('Setting up failureRedirect route: ' + authOptions.failureRedirect);

      app.get(authOptions.failureRedirect, function (req, res) {
        res.sendFile(_path2.default.resolve(__dirname, 'public', 'auth-fail.html'));
      });
    }
  };
}

auth.hooks = _hooks2.default;
module.exports = exports['default'];