'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handleMouseButtonProtocol = require('../helpers/handleMouseButtonProtocol');

var _handleMouseButtonProtocol2 = _interopRequireDefault(_handleMouseButtonProtocol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonUp = function buttonUp(button) {
    return _handleMouseButtonProtocol2.default.call(this, '/session/:sessionId/buttonup', button);
}; /**
    *
    * Releases the mouse button previously held (where the mouse is currently at). Must
    * be called once for every buttondown command issued. See the note in click and
    * buttondown about implications of out-of-order commands.
    *
    * @param {Number} button  Which button, enum: *{LEFT = 0, MIDDLE = 1 , RIGHT = 2}*. Defaults to the left mouse button if not specified.
    *
    * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidbuttonup
    * @type protocol
    *
    */

exports.default = buttonUp;
module.exports = exports['default'];
