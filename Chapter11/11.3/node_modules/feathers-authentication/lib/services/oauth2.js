'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (options) {
  options = Object.assign({}, defaults, options);

  options.permissions.state = options.permissions.state === undefined ? true : options.permissions.state;
  options.permissions.session = options.permissions.session === undefined ? false : options.permissions.session;

  if (!options.provider) {
    throw new Error('You need to pass a `provider` for your authentication provider');
  }

  if (!options.endPoint) {
    throw new Error('You need to provide an \'endPoint\' for your ' + options.provider + ' provider');
  }

  if (!options.strategy) {
    throw new Error('You need to provide a Passport \'strategy\' for your ' + options.provider + ' provider');
  }

  options.callbackURL = options.callbackURL || options.endPoint + '/' + options.callbackSuffix;

  debug('configuring ' + options.provider + ' OAuth2 service with options', options);

  return function () {
    var app = this;
    var Strategy = options.strategy;
    var TokenStrategy = options.tokenStrategy;

    // Initialize our service with any options it requires
    app.use(options.endPoint, _middleware.exposeConnectMiddleware, new Service(options), (0, _middleware.successfulLogin)(options));

    // Get our initialized service
    var service = app.service(options.endPoint);

    // Register our Passport auth strategy and get it to use our passport callback function
    debug('registering passport-' + options.provider + ' OAuth2 strategy');
    _passport2.default.use(new Strategy(options, service.oauthCallback.bind(service)));

    if (TokenStrategy) {
      debug('registering passport-' + options.provider + '-token OAuth2 strategy');
      _passport2.default.use(new TokenStrategy(options, service.oauthCallback.bind(service)));
    }
  };
};

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _middleware = require('../middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('feathers-authentication:oauth2');

// Provider specific config
var defaults = {
  passReqToCallback: true,
  callbackSuffix: 'callback',
  permissions: {
    state: true,
    session: false
  }
};

var Service = exports.Service = function () {
  function Service() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Service);

    this.options = options;
  }

  _createClass(Service, [{
    key: 'oauthCallback',
    value: function oauthCallback(req, accessToken, refreshToken, profile, done) {
      var app = this.app;
      var options = this.options;
      var params = {
        query: _defineProperty({}, options.provider + 'Id', profile.id)
      };

      // Find or create the user since they could have signed up via facebook.
      app.service(options.userEndpoint).find(params).then(function (users) {
        var _Object$assign;

        // Paginated services return the array of results in the data attribute.
        var user = users[0] || users.data && users.data[0];

        // TODO (EK): This is where we should look at req.user and see if we
        // can consolidate profiles. We might want to give the developer a hook
        // so that they can control the consolidation strategy.
        var providerData = Object.assign({}, profile._json, { accessToken: accessToken });

        var data = Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, options.provider + 'Id', profile.id), _defineProperty(_Object$assign, '' + options.provider, providerData), _Object$assign));

        // If user found update and return them
        if (user) {
          var id = user[options.idField];

          // Merge existing user data with new profile data
          // TODO (EK): If stored profile data has been altered this might
          // just overwrite the whole `<provider>` field when it should do a
          // deep merge.
          data = Object.assign({}, user, data);

          debug('Updating user: ' + id);

          return app.service(options.userEndpoint).patch(id, data).then(function (updatedUser) {
            return done(null, updatedUser);
          }).catch(done);
        }

        debug('Creating new user with ' + options.provider + 'Id: ' + profile.id);

        // No user found so we need to create one.
        return app.service(options.userEndpoint).create(data).then(function (user) {
          debug('Created new user: ' + user[options.idField]);

          return done(null, user);
        }).catch(done);
      }).catch(done);
    }

    // GET /auth/facebook

  }, {
    key: 'find',
    value: function find(params) {
      // Authenticate via your provider. This will redirect you to authorize the application.
      return _passport2.default.authenticate(this.options.provider, this.options.permissions)(params.req, params.res);
    }

    // For GET /auth/facebook/callback

  }, {
    key: 'get',
    value: function get(id, params) {
      var options = this.options;
      var app = this.app;

      // TODO (EK): Make this configurable
      if (id !== options.callbackSuffix) {
        return Promise.reject(new _feathersErrors2.default.NotFound());
      }

      return new Promise(function (resolve, reject) {

        var middleware = _passport2.default.authenticate(options.provider, options.permissions, function (error, user) {
          if (error) {
            return reject(error);
          }

          // Login failed.
          if (!user) {
            return reject(new _feathersErrors2.default.NotAuthenticated('An error occurred logging in with ' + options.provider));
          }

          // Get a new JWT and the associated user from the Auth token service and send it back to the client.
          return app.service(options.tokenEndpoint).create(user).then(resolve).catch(reject);
        });

        middleware(params.req, params.res);
      });
    }

    // POST /auth/facebook /auth/facebook::create
    // This is for mobile token based authentication

  }, {
    key: 'create',
    value: function create(data, params) {
      var options = this.options;
      var app = this.app;

      if (!options.tokenStrategy) {
        return Promise.reject(new _feathersErrors2.default.MethodNotAllowed());
      }

      // Authenticate via facebook, then generate a JWT and return it
      return new Promise(function (resolve, reject) {
        var middleware = _passport2.default.authenticate(options.provider + '-token', options.permissions, function (error, user) {
          if (error) {
            return reject(error);
          }

          // Login failed.
          if (!user) {
            return reject(new _feathersErrors2.default.NotAuthenticated('An error occurred logging in with ' + options.provider));
          }

          // Get a new JWT and the associated user from the Auth token service and send it back to the client.
          return app.service(options.tokenEndpoint).create(user).then(resolve).catch(reject);
        });

        middleware(params.req, params.res);
      });
    }
  }, {
    key: 'setup',
    value: function setup(app) {
      // attach the app object to the service context
      // so that we can call other services
      this.app = app;

      // prevent regular service events from being dispatched
      if (typeof this.filter === 'function') {
        this.filter(function () {
          return false;
        });
      }
    }
  }]);

  return Service;
}();