'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Indicates whether IME input is active at the moment (not if it's available.
 * (Not part of the official Webdriver specification)
 *
 * @returns {boolean}  true if IME input is available and currently active, false otherwise
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactivated
 * @type protocol
 *
 */

var imeActivated = function imeActivated() {
    return this.requestHandler.create('/session/:sessionId/ime/activated');
};

exports.default = imeActivated;
module.exports = exports['default'];
