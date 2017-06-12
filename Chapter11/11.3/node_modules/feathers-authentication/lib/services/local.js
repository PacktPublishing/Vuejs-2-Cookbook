'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (options) {
  options = Object.assign({}, defaults, options);
  debug('configuring local authentication service with options', options);

  return function () {
    var app = this;

    // Initialize our service with any options it requires
    app.use(options.localEndpoint, _middleware.exposeConnectMiddleware, new Service(options), (0, _middleware.successfulLogin)(options));

    // Get our initialize service to that we can bind hooks
    var localService = app.service(options.localEndpoint);

    // Register our local auth strategy and get it to use the passport callback function
    debug('registering passport-local strategy');
    _passport2.default.use(new _passportLocal.Strategy(options, localService.checkCredentials.bind(localService)));
  };
};

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _middleware = require('../middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('feathers-authentication:local');
var defaults = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
};

var Service = exports.Service = function () {
  function Service() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Service);

    this.options = options;
  }

  _createClass(Service, [{
    key: 'buildCredentials',
    value: function buildCredentials(req) {
      var _options = this.options,
          usernameField = _options.usernameField,
          usernameFields = _options.usernameFields;

      return new Promise(function (resolve, reject) {
        var field = usernameField;
        if (usernameFields) {
          field = usernameFields.find(function (f) {
            return !!req.body[f];
          });
          if (!field) {
            return reject(new Error('Missing identity field.'));
          }
        }

        var params = {
          query: _defineProperty({}, field, req.body[field])
        };

        resolve(params);
      });
    }
  }, {
    key: 'checkCredentials',
    value: function checkCredentials(req, username, password, done) {
      var _this = this;

      this.app.service(this.options.localEndpoint).buildCredentials(req, username, password)
      // Look up the user
      .then(function (params) {
        return _this.app.service(_this.options.userEndpoint).find(params);
      }).then(function (users) {
        // Paginated services return the array of results in the data attribute.
        var user = users[0] || users.data && users.data[0];

        // Handle bad username.
        if (!user) {
          return done(null, false);
        }

        return user;
      }).then(function (user) {
        var crypto = _this.options.bcrypt || _bcryptjs2.default;
        // Check password
        var hash = user[_this.options.passwordField];

        if (!hash) {
          return done(new Error('User record in the database is missing a \'' + _this.options.passwordField + '\''));
        }

        crypto.compare(password, hash, function (error, result) {
          // Handle 500 server error.
          if (error) {
            return done(error);
          }

          return done(null, result ? user : false);
        });
      }).catch(done);
    }

    // POST /auth/local

  }, {
    key: 'create',
    value: function create(data, params) {
      var options = this.options;
      var app = this.app;

      // Validate username and password, then generate a JWT and return it
      return new Promise(function (resolve, reject) {
        var middleware = _passport2.default.authenticate('local', { session: options.session }, function (error, user) {
          if (error) {
            return reject(error);
          }

          // Login failed.
          if (!user) {
            return reject(new _feathersErrors2.default.NotAuthenticated('Invalid login.'));
          }

          // Get a new JWT and the associated user from the Auth token service and send it back to the client.
          return app.service(options.tokenEndpoint).create(user).then(resolve).catch(reject);
        });

        middleware(params.req);
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