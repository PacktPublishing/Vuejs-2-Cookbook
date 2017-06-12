'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var elementIdLocationInView = function elementIdLocationInView(id) {
    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with elementIdLocationInView protocol command');
    }

    return this.requestHandler.create('/session/:sessionId/element/' + id + '/location_in_view');
}; /**
    *
    * Determine an element's location on the screen once it has been scrolled into view.
    *
    * *Note:* This is considered an internal command and should only be used to determine
    * an element's location for correctly generating native events.
    *
    * Depcrecated command, please use `elementIdRect`.
    *
    * @param {String} ID ID of a WebElement JSON object to route the command to
    * @returns {Object} The X and Y coordinates for the element (`{x:number, y:number}`)
    *
    * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidlocation_in_view
    * @type protocol
    * @deprecated
    *
    */

exports.default = elementIdLocationInView;
module.exports = exports['default'];
