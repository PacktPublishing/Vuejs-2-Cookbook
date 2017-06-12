'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var _findElementStrategy = require('../helpers/findElementStrategy');

var _findElementStrategy2 = _interopRequireDefault(_findElementStrategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Search for multiple elements on the page, starting from an element. The located
 * elements will be returned as a WebElement JSON objects. The table below lists the
 * locator strategies that each server should support. Elements should be returned in
 * the order located in the DOM.
 *
 * @param {String} ID ID of a WebElement JSON object to route the command to
 * @param {String} selector selector to query the elements
 * @returns {Object[]} A list of WebElement JSON objects for the located elements.
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidelements
 * @type protocol
 *
 */

var elementIdElements = function elementIdElements(id, selector) {
    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with elementIdElements protocol command');
    }

    var found = (0, _findElementStrategy2.default)(selector, true);
    return this.requestHandler.create('/session/:sessionId/element/' + id + '/elements', {
        using: found.using,
        value: found.value
    });
};

exports.default = elementIdElements;
module.exports = exports['default'];
