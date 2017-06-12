'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Maximize the specified window if not already maximized. If the :windowHandle URL parameter is "current",
 * the currently active window will be maximized.
 *
 * @param {String=} windowHandle window to maximize (if parameter is falsy the currently active window will be maximized)
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-maximize-window
 * @type protocol
 *
 */

var windowHandleMaximize = function windowHandleMaximize() {
    var windowHandle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';

    return this.requestHandler.create({
        path: '/session/:sessionId/window/' + windowHandle + '/maximize',
        method: 'POST'
    });
};

exports.default = windowHandleMaximize;
module.exports = exports['default'];
