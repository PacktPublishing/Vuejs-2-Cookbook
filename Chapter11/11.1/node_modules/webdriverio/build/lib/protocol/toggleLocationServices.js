'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Switch the state (enabled/disabled) of the location service.
 *
 * <example>
    :toggleLocationServices.js
    browser.toggleLocationServices();
 * </example>
 *
 * @type mobile
 * @for android
 *
 */

var toggleLocationServices = function toggleLocationServices() {
    return this.requestHandler.create({
        path: '/session/:sessionId/appium/device/toggle_location_services',
        method: 'POST'
    });
};

exports.default = toggleLocationServices;
module.exports = exports['default'];
