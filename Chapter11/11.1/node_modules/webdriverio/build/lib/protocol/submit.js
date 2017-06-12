'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var submit = function submit(id) {
    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with submit protocol command');
    }

    return this.requestHandler.create({
        path: '/session/:sessionId/element/' + id + '/submit',
        method: 'POST'
    });
}; /**
    *
    * Submit a FORM element. The submit command may also be applied to any element
    * that is a descendant of a FORM element. (Not part of the official Webdriver specification).
    *
    * @param {String} ID ID of a `<form />` WebElement JSON object to route the command to
    *
    * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidsubmit
    * @type protocol
    *
    */

exports.default = submit;
module.exports = exports['default'];
