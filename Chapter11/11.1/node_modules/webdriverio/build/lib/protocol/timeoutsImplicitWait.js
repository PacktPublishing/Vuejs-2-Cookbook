'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var timeoutsImplicitWait = function timeoutsImplicitWait(ms) {
    /*!
     * parameter check
     */
    if (typeof ms !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with timeoutsImplicitWait protocol command');
    }

    return this.requestHandler.create('/session/:sessionId/timeouts/implicit_wait', {
        ms: ms
    });
}; /**
    *
    * Set the amount of time the driver should wait when searching for elements. When searching for a single element,
    * the driver should poll the page until an element is found or the timeout expires, whichever occurs first. When
    * searching for multiple elements, the driver should poll the page until at least one element is found or the
    * timeout expires, at which point it should return an empty list.
    *
    * If this command is never sent, the driver should default to an implicit wait of 0ms.
    *
    * Depcrecated! Please use the `timeouts` command instead.
    *
    * @param {Number} ms   The amount of time to wait, in milliseconds. This value has a lower bound of 0.
    *
    * @see https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeoutsimplicit_wait
    * @type protocol
    *
    */

exports.default = timeoutsImplicitWait;
module.exports = exports['default'];
