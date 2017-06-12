'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handleMouseButtonProtocol = require('../helpers/handleMouseButtonProtocol');

var _handleMouseButtonProtocol2 = _interopRequireDefault(_handleMouseButtonProtocol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonDown = function buttonDown(button) {
    return _handleMouseButtonProtocol2.default.call(this, '/session/:sessionId/buttondown', button);
}; /**
    *
    * Click and hold the left mouse button (at the coordinates set by the last moveto
    * command). Note that the next mouse-related command that should follow is buttonup.
    * Any other mouse command (such as click or another call to buttondown) will yield
    * undefined behaviour.
    *
    * @param {Number} button  Which button, enum: *{LEFT = 0, MIDDLE = 1 , RIGHT = 2}*. Defaults to the left mouse button if not specified.
    *
    * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidbuttondown
    * @type protocol
    *
    */

exports.default = buttonDown;
module.exports = exports['default'];
