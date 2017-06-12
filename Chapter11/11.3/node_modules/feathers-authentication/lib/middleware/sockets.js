'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSocketIOAuthentication = setupSocketIOAuthentication;
exports.setupPrimusAuthentication = setupPrimusAuthentication;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:middleware');

function setupSocketHandler(feathersParams, provider, emit, app, options) {
  return function (socket) {
    var errorHandler = function errorHandler(error) {
      socket[emit]('unauthorized', error, function () {
        // TODO (EK): Maybe we support disconnecting the socket
        // if a certain number of authorization attempts have failed
        // for brute force protection
        // socket.disconnect('unauthorized');
      });

      throw error;
    };

    // Expose the request object to services and hooks
    // for Passport. This is normally a big no no.
    feathersParams(socket).req = socket.request;

    socket.on('authenticate', function (data) {
      // Authenticate the user using token strategy
      if (data.token) {
        if (typeof data.token !== 'string') {
          return errorHandler(new _feathersErrors2.default.BadRequest('Invalid token data type.'));
        }

        var params = Object.assign({ provider: provider }, data);

        // The token gets normalized in hook.params for REST so we'll stay with
        // convention and pass it as params using sockets.
        app.service(options.tokenEndpoint).create({}, params).then(function (response) {
          feathersParams(socket).token = response.token;
          feathersParams(socket).user = response.data;
          socket[emit]('authenticated', response);
        }).catch(errorHandler);
      }
      // Authenticate the user using local auth strategy
      else {
          // Put our data in a fake req.body object to get local auth
          // with Passport to work because it checks res.body for the
          // username and password.
          var _params = { provider: provider, req: socket.request };

          _params.req.body = data;

          app.service(options.localEndpoint).create(data, _params).then(function (response) {
            feathersParams(socket).token = response.token;
            feathersParams(socket).user = response.data;
            socket[emit]('authenticated', response);
          }).catch(errorHandler);
        }
    });

    socket.on('logout', function (callback) {
      // TODO (EK): Blacklist token
      try {
        delete feathersParams(socket).token;
        delete feathersParams(socket).user;
      } catch (error) {
        debug('There was an error logging out', error);
        return callback(new Error('There was an error logging out'));
      }

      callback();
    });
  };
}

function setupSocketIOAuthentication(app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  debug('Setting up Socket.io authentication middleware with options:', options);

  return setupSocketHandler(function (socket) {
    return socket.feathers;
  }, 'socketio', 'emit', app, options);
}

function setupPrimusAuthentication(app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  debug('Setting up Primus authentication middleware with options:', options);

  return setupSocketHandler(function (socket) {
    return socket.request.feathers;
  }, 'primus', 'send', app, options);
}