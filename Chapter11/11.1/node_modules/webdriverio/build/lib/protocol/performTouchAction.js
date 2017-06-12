'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _ErrorHandler = require('../utils/ErrorHandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var performTouchAction = function performTouchAction(action) {
    if ((typeof action === 'undefined' ? 'undefined' : (0, _typeof3.default)(action)) !== 'object') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with performTouchAction protocol command');
    }

    return this.requestHandler.create({
        path: '/session/:sessionId/touch/perform',
        method: 'POST'
    }, action);
}; /**
    *
    * Perform touch action
    *
    * @param {Object} touchAttr contains attributes of touch gesture (e.g. `element`, `x` and `y`)
    *
    * @see  https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/appium-bindings.md#touchaction--multitouchaction
    * @type mobile
    * @for android, ios
    *
    */

exports.default = performTouchAction;
module.exports = exports['default'];
