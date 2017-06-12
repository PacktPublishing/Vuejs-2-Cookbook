'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handleMouseButtonProtocol = require('../helpers/handleMouseButtonProtocol');

var _handleMouseButtonProtocol2 = _interopRequireDefault(_handleMouseButtonProtocol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonPress = function buttonPress(button) {
    return _handleMouseButtonProtocol2.default.call(this, '/session/:sessionId/click', button);
}; /**
    *
    * Click any mouse button (at the coordinates set by the last moveto command). Note
    * that calling this command after calling buttondown and before calling button up
    * (or any out-of-order interactions sequence) will yield undefined behaviour.
    *
    * @param {Number} button  Which button, enum: *{LEFT = 0, MIDDLE = 1 , RIGHT = 2}*. Defaults to the left mouse button if not specified.
    * @type protocol
    *
    */

exports.default = buttonPress;
module.exports = exports['default'];
