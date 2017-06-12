'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _ErrorHandler = require('../utils/ErrorHandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var windowHandleSize = function windowHandleSize() {
    var windowHandle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
    var size = arguments[1];

    var data = {};

    if ((typeof windowHandle === 'undefined' ? 'undefined' : (0, _typeof3.default)(windowHandle)) === 'object') {
        var _ref = ['current', windowHandle];
        windowHandle = _ref[0];
        size = _ref[1];
    }

    /*!
     * protocol options
     */
    var requestOptions = {
        path: '/session/:sessionId/window/' + windowHandle + '/size',
        method: 'GET'
    };

    /*!
     * change window size if the new size is given
     */
    if ((typeof size === 'undefined' ? 'undefined' : (0, _typeof3.default)(size)) === 'object' && size.width && size.height) {
        requestOptions.method = 'POST';
        // The width and height value might return as a negative value, so
        // we make sure to use its absolute value.
        data = {
            width: Math.abs(size.width),
            height: Math.abs(size.height)
        };
    }

    /*!
     * type check
     */
    if (requestOptions.method === 'POST' && typeof data.width !== 'number' && typeof data.height !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with windowHandleSize protocol command');
    }

    return this.requestHandler.create(requestOptions, data);
}; /**
    *
    * Protocol binding to get or change the size of the browser.
    *
    * <example>
       :windowHandleSize.js
       it('should get or set window position', function () {
           // change the size of a specified window
           client.windowHandleSize('{dc30381e-e2f3-9444-8bf3-12cc44e8372a}', {width: 800, height: 600});
           // or set the current window size
           browser.windowHandleSize({width: 800, height: 600});
   
           // get the size of a specified window
           var size = browser.windowHandleSize('{dc30381e-e2f3-9444-8bf3-12cc44e8372a}');
           // or of the current window
           size = browser.windowHandleSize();
   
           console.log(size); // outputs: {width: 800, height: 600}
       });
    * </example>
    *
    * @param {String=} windowHandle the window to receive/change the size
    * @param {Object=} dimension    the new size of the window
    *
    * @returns {Object} the size of the window (`{width: number, height: number}`)
    *
    * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-set-window-size
    * @type protocol
    *
    */

exports.default = windowHandleSize;
module.exports = exports['default'];
