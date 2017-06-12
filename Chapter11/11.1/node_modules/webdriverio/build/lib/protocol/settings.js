'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Either retrieve a JSON hash of all the currently specified settings or update the current setting on the device.
 *
 * <example>
    :settings.js
    it('should update/get settinsg on the device', function () {
        // update setting on the device
        browser.settings({ cyberdelia: 'open' });

        // get current settings
        var settings = browser.settings()
        console.log(settings.cyberdelia); // returns 'open'
    });
 * </example>
 *
 * @type mobile
 * @param {Object=}  settings  key/value pairs defining settings on the device
 * @returns {Object} current settings (only if method was called without parameters)
 *
 */

var settings = function settings(_settings) {
    var settingsRoute = '/session/:sessionId/appium/settings';

    /**
     * get current settings
     */
    if (!_settings) {
        return this.requestHandler.create(settingsRoute);
    }

    return this.requestHandler.create({
        path: settingsRoute,
        method: 'POST'
    }, { settings: _settings });
};

exports.default = settings;
module.exports = exports['default'];
