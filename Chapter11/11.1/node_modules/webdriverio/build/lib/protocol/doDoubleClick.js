'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Double-clicks at the current mouse coordinates (set by moveto. (Not part of the official Webdriver specification).
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessioniddoubleclick
 * @type protocol
 *
 */

var doDoubleClick = function doDoubleClick() {
    return this.requestHandler.create({
        path: '/session/:sessionId/doubleclick',
        method: 'POST'
    });
};

exports.default = doDoubleClick;
module.exports = exports['default'];
