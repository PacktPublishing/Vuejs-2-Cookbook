'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Accepts the currently displayed alert dialog. Usually, this is equivalent to
 * clicking on the 'OK' button in the dialog.
 *
 * <example>
    :alertAccept.js
    it('demonstrate the alertAccept command', function () {
        if (browser.alertText()) {
            browser.alertAccept();
        }
        // ...
    });
 * </example>
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#accept-alert
 * @type protocol
 *
 */

var alertAccept = function alertAccept() {
    // ToDo change path to new route
    // according to Webdriver specification: /session/{session id}/alert/accept
    var requestOptions = {
        path: '/session/:sessionId/accept_alert',
        method: 'POST'
    };

    return this.requestHandler.create(requestOptions);
};

exports.default = alertAccept;
module.exports = exports['default'];
