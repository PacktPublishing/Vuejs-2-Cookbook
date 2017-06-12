'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var elementIdDisplayed = function elementIdDisplayed(id) {
    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with elementIdDisplayed protocol command');
    }

    return this.requestHandler.create('/session/:sessionId/element/' + id + '/displayed');
}; /**
    *
    * Determine if an element is currently displayed.
    *
    * @param {String} ID ID of a WebElement JSON object to route the command to
    * @returns {Boolean} true if the element is displayed
    *
    * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementiddisplayed
    * @type protocol
    *
    */

exports.default = elementIdDisplayed;
module.exports = exports['default'];
