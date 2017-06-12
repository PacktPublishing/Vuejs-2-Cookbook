'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var touchDown = function touchDown(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with touchDown command');
    }

    return this.requestHandler.create('/session/:sessionId/touch/down', {
        x: x,
        y: y
    });
}; /**
    *
    * Finger down on the screen. Depcrecated! Please use `touchPerform` instead.
    *
    * @param {Number} x  X coordinate on the screen
    * @param {Number} y  Y coordinate on the screen
    *
    * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchdown
    * @type protocol
    *
    */

exports.default = touchDown;
module.exports = exports['default'];
