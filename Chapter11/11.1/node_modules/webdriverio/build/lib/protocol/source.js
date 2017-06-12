'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * Get the current page source.
 *
 * @returns {String} The current page source.
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-get-page-source
 * @type protocol
 *
 */

var source = function source() {
  return this.requestHandler.create('/session/:sessionId/source');
};

exports.default = source;
module.exports = exports['default'];
