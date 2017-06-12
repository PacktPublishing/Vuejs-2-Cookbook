'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * Returns an object with a value field containing the list of all available contexts
 *
 * @see http://appium.io/slate/en/v1.1.0/?javascript#automating-hybrid-ios-apps
 * @see https://github.com/admc/wd/blob/master/lib/commands.js#L279
 * @type mobile
 * @for android, ios
 *
 */

var contexts = function contexts() {
  return this.requestHandler.create('/session/:sessionId/contexts');
};

exports.default = contexts;
module.exports = exports['default'];
