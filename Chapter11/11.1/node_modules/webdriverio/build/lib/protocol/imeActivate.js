'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var imeActivate = function imeActivate(engine) {
    if (typeof engine !== 'string') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with imeActivate protocol command');
    }

    return this.requestHandler.create('/session/:sessionId/ime/activate', {
        engine: engine
    });
}; /**
    *
    * Make an engines that is available (appears on the list returned by getAvailableEngines) active.
    * After this call, the engine will be added to the list of engines loaded in the IME daemon and the
    * input sent using sendKeys will be converted by the active engine. Note that this is a
    * platform-independent method of activating IME (the platform-specific way being using keyboard shortcuts.
    * (Not part of the official Webdriver specification)
    *
    * @param {String} engine   Name of the engine to activate.
    *
    * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactive_engine
    * @type protocol
    *
    */

exports.default = imeActivate;
module.exports = exports['default'];
