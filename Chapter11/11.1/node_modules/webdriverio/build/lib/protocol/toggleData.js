'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Switch the state (enabled/disabled) of data service.
 *
 * <example>
    :toggleData.js
    browser.toggleData()
 * </example>
 *
 * @type mobile
 * @for android
 *
 */

var toggleData = function toggleData() {
    return this.requestHandler.create({
        path: '/session/:sessionId/appium/device/toggle_data',
        method: 'POST'
    });
};

exports.default = toggleData;
module.exports = exports['default'];
