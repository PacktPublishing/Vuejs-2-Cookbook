'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * Get the name of the active IME engine. The name string is platform specific. (Not part of the
 * official Webdriver specification)
 *
 * @returns {String} engine   The name of the active IME engine.
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactive_engine
 * @type protocol
 *
 */

var imeActiveEngine = function imeActiveEngine() {
  return this.requestHandler.create('/session/:sessionId/ime/active_engine');
};

exports.default = imeActiveEngine;
module.exports = exports['default'];
