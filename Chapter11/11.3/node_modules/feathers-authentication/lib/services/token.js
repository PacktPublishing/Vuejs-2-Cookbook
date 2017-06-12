'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (options) {
  options = Object.assign({}, defaults, options);

  debug('configuring token authentication service with options', options);

  return function () {
    var app = this;

    // Initialize our service with any options it requires
    app.use(options.tokenEndpoint, new Service(options));

    // Get our initialize service to that we can bind hooks
    var tokenService = app.service(options.tokenEndpoint);

    // Set up our before hooks
    tokenService.before({
      create: [_verifyToken(options)],
      find: [_verifyToken(options)],
      get: [_verifyToken(options)]
    });

    tokenService.after({
      create: [_hooks2.default.populateUser(options), _feathersHooks2.default.remove(options.passwordField, function () {
        return true;
      })],
      find: [_hooks2.default.populateUser(options), _feathersHooks2.default.remove(options.passwordField, function () {
        return true;
      })],
      get: [_hooks2.default.populateUser(options), _feathersHooks2.default.remove(options.passwordField, function () {
        return true;
      })]
    });
  };
};

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _hooks = require('../hooks');

var _hooks2 = _interopRequireDefault(_hooks);

var _feathersHooks = require('feathers-hooks');

var _feathersHooks2 = _interopRequireDefault(_feathersHooks);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('feathers-authentication:token');

// Provider specific config
var defaults = {
  payload: [],
  passwordField: 'password',
  issuer: 'feathers',
  algorithm: 'HS256',
  expiresIn: '1d' };

/**
 * Verifies that a JWT token is valid. This is a private hook.
 *
 * @param  {Object} options - An options object
 * @param {String} options.secret - The JWT secret
 */
var _verifyToken = function _verifyToken() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var secret = options.secret;

  return function (hook) {
    return new Promise(function (resolve, reject) {
      // If it was an internal call just skip
      if (!hook.params.provider) {
        hook.params.data = hook.data;
        return resolve(hook);
      }

      var token = hook.params.token;

      _jsonwebtoken2.default.verify(token, secret, options, function (error, payload) {
        if (error) {
          // Return a 401 if the token has expired.
          return reject(new _feathersErrors2.default.NotAuthenticated(error));
        }

        // Normalize our params with the token in it.
        hook.data = payload;
        hook.params.data = Object.assign({}, hook.data, payload, { token: token });
        hook.params.query = Object.assign({}, hook.params.query, { token: token });
        resolve(hook);
      });
    });
  };
};

var Service = exports.Service = function () {
  function Service() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Service);

    this.options = options;
  }

  // GET /auth/token
  // This is sort of a dummy route that we are using just to verify
  // that our token is correct by running our verifyToken hook. It
  // doesn't refresh our token it just returns our existing one with
  // our user data.
  // find(params) {
  //   if (params.data && params.data.token) {
  //     const token = params.data.token;
  //     delete params.data.token;

  //     return Promise.resolve({
  //       token: token,
  //       data: params.data
  //     });
  //   }

  //   return Promise.reject(new errors.GeneralError('Something weird happened'));
  // }

  // GET /auth/token/refresh


  _createClass(Service, [{
    key: 'get',
    value: function get(id, params) {
      if (id !== 'refresh') {
        return Promise.reject(new _feathersErrors2.default.NotFound());
      }

      var options = this.options;
      var data = params;
      // Our before hook determined that we had a valid token or that this
      // was internally called so let's generate a new token with the user
      // id and return both the ID and the token.
      return new Promise(function (resolve) {
        _jsonwebtoken2.default.sign(data, options.secret, options, function (token) {
          return resolve(Object.assign(data, { token: token }));
        });
      });
    }

    // POST /auth/token

  }, {
    key: 'create',
    value: function create(user) {
      var options = this.options;

      var data = _defineProperty({}, options.idField, user[options.idField]);

      // Add any additional payload fields
      options.payload.forEach(function (field) {
        return data[field] = user[field];
      });

      // Our before hook determined that we had a valid token or that this
      // was internally called so let's generate a new token with the user
      // id and return both the ID and the token.
      return new Promise(function (resolve) {
        _jsonwebtoken2.default.sign(data, options.secret, options, function (token) {
          return resolve(Object.assign(data, { token: token }));
        });
      });
    }
  }, {
    key: 'setup',
    value: function setup() {
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