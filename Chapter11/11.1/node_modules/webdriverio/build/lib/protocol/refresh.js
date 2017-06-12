'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Refresh the current page.
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-refresh
 * @type protocol
 *
 */

var refresh = function refresh() {
    return this.requestHandler.create({
        path: '/session/:sessionId/refresh',
        method: 'POST'
    });
};

exports.default = refresh;
module.exports = exports['default'];
