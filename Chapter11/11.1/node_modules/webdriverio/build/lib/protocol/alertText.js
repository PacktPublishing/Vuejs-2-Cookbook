'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Gets the text of the currently displayed JavaScript alert(), confirm(), or prompt() dialog.
 *
 * <example>
    :alertText.js
    it('demonstrate the alertDismiss command', function () {
        if (browser.alertText()) {
            browser.alertDismiss();
        }
        // ...
    });
 * </example>
 *
 * @param {String=} text  Keystrokes to send to the prompt() dialog.
 * @returns {String}      The text of the currently displayed alert.
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#get-alert-text
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#send-alert-text
 * @type protocol
 *
 */

var alertText = function alertText(text) {
    // ToDo change path to new route
    // according to Webdriver specification: /session/{session id}/alert/text
    var requestOptions = '/session/:sessionId/alert_text';
    var data = {};

    if (typeof text === 'string') {
        requestOptions = {
            path: requestOptions,
            method: 'POST'
        };

        data = { text: text };
    }

    return this.unify(this.requestHandler.create(requestOptions, data), {
        extractValue: true
    });
};

exports.default = alertText;
module.exports = exports['default'];
