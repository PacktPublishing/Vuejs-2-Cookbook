'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * De-activates the currently-active IME engine. (Not part of the official Webdriver specification)
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimedeactivate
 * @type protocol
 *
 */

var imeDeactivated = function imeDeactivated() {
  return this.requestHandler.create('/session/:sessionId/ime/deactivated');
};

exports.default = imeDeactivated;
module.exports = exports['default'];
