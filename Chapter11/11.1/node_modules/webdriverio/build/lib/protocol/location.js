'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Protocol bindings for all geolocation operations. (Not part of the official Webdriver specification).
 *
 * <example>
    :location.js
    it('should set geo location for device', function () {
        // set the current geo location
        client.location({latitude: 121.21, longitude: 11.56, altitude: 94.23})

        // get the current geo location
        client.location().then(function(res) { ... });
    });
 * </example>
 *
 * @param {Object} location  the new location
 * @returns {Object}         the current geo location
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocation
 * @type protocol
 *
 */

var location = function location(l) {
    var location = null;

    if ((typeof l === 'undefined' ? 'undefined' : (0, _typeof3.default)(l)) === 'object' && l.latitude !== undefined && l.longitude !== undefined && l.altitude !== undefined) {
        location = l;
    }

    /**
     * get geo location
     */
    if (!location) {
        return this.requestHandler.create('/session/:sessionId/location');
    }

    /**
     * set geo location
     * @type {[type]}
     */
    return this.requestHandler.create('/session/:sessionId/location', { location: location });
};

exports.default = location;
module.exports = exports['default'];
