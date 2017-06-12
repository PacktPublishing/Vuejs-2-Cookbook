'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createApplication;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _feathers = require('./feathers');

var _feathers2 = _interopRequireDefault(_feathers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global._babelPolyfill) {
  require('babel-polyfill');
}

function createApplication() {
  return (0, _feathers2.default)(_express2.default.apply(undefined, arguments));
}

// Expose all express methods (like express.engine())
Object.assign(createApplication, _express2.default, {
  version: require('../package.json').version
});
module.exports = exports['default'];