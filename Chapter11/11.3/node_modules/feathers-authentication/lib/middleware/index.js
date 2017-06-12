'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sockets = require('./sockets');

var _express = require('./express');

exports.default = {
  exposeConnectMiddleware: _express.exposeConnectMiddleware,
  normalizeAuthToken: _express.normalizeAuthToken,
  successfulLogin: _express.successfulLogin,
  failedLogin: _express.failedLogin,
  setupSocketIOAuthentication: _sockets.setupSocketIOAuthentication,
  setupPrimusAuthentication: _sockets.setupPrimusAuthentication
};
module.exports = exports['default'];