'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * protocol bindings to get local_storage size. (Not part of the official Webdriver specification)
 *
 * @returns {Number} The number of items in the storage.
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storagesize
 * @type protocol
 *
 */

var localStorageSize = function localStorageSize() {
  return this.requestHandler.create('/session/:sessionId/local_storage/size');
};

exports.default = localStorageSize;
module.exports = exports['default'];
