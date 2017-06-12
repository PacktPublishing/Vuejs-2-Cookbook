"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Return true or false if the selected DOM-element currently has focus.
 *
 * <example>
    :index.html
    <input name="login" autofocus="" />

    :hasFocus.js
    it('should detect the focus of an element', function () {
        browser.url('/');

        var loginInput = $('[name="login"]');
        console.log(loginInput.hasFocus()); // outputs: false

        loginInput.click();
        console.log(loginInput.hasFocus()); // outputs: true
    })
 * </example>
 *
 * @alias browser.hasFocus
 * @param {String} selector   select active element
 * @returns {Boolean}         true if element has focus
 * @uses protocol/execute
 * @type state
 *
 */

var hasFocus = function hasFocus(selector) {
    var result = this.execute(function (selector) {
        var focused = document.activeElement;

        if (!focused || focused === document.body) {
            return false;
        } else if (document.querySelector) {
            return focused === document.querySelector(selector);
        }

        return false;
    }, selector);

    return result.then(function (result) {
        return result.value;
    });
};

exports.default = hasFocus;
module.exports = exports["default"];
