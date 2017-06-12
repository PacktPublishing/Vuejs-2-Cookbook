'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * List all available engines on the machine. To use an engine, it has to be present
 * in this list. (Not part of the official Webdriver specification)
 *
 * @returns {Object[]} engines   A list of available engines
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeavailable_engines
 * @type protocol
 *
 */

var imeAvailableEngines = function imeAvailableEngines() {
  return this.requestHandler.create('/session/:sessionId/ime/available_engines');
};

exports.default = imeAvailableEngines;
module.exports = exports['default'];
