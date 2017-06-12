'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var elementIdSelected = function elementIdSelected(id) {
    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with elementIdSelected protocol command');
    }

    return this.requestHandler.create('/session/:sessionId/element/' + id + '/selected');
}; /**
    *
    * Determine if an OPTION element, or an INPUT element of type checkbox or
    * radiobutton is currently selected.
    *
    * @param {String} ID ID of a WebElement JSON object to route the command to
    * @returns {Boolean} true if the element is selected.
    *
    * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-is-element-selected
    * @type protocol
    *
    */

exports.default = elementIdSelected;
module.exports = exports['default'];
