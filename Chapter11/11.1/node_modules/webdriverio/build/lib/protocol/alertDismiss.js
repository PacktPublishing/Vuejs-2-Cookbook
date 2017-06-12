'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Dismisses the currently displayed alert dialog. For confirm() and prompt()
 * dialogs, this is equivalent to clicking the 'Cancel' button. For alert()
 * dialogs, this is equivalent to clicking the 'OK' button.
 *
 * <example>
    :alertAccept.js
    it('demonstrate the alertDismiss command', function () {
        if (browser.alertText()) {
            browser.alertDismiss();
        }
        // ...
    });
 * </example>
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dismiss-alert
 * @type protocol
 *
 */

var alertDismiss = function alertDismiss() {
    // ToDo change path to new route
    // according to Webdriver specification: /session/{session id}/alert/dismiss
    var requestOptions = {
        path: '/session/:sessionId/dismiss_alert',
        method: 'POST'
    };

    return this.requestHandler.create(requestOptions);
};

exports.default = alertDismiss;
module.exports = exports['default'];
