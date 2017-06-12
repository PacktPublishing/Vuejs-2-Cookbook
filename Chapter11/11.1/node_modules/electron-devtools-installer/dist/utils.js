'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadFile = exports.getPath = undefined;

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPath = exports.getPath = function getPath() {
  var savePath = (_electron.remote || _electron2.default).app.getPath('userData');
  return _path2.default.resolve(savePath + '/extensions');
};

// Use https.get fallback for Electron < 1.4.5

var _ref = _electron.remote || _electron2.default,
    net = _ref.net;

var request = net ? net.request : _https2.default.get;

var downloadFile = exports.downloadFile = function downloadFile(from, to) {
  return new Promise(function (resolve, reject) {
    var req = request(from);
    req.on('response', function (res) {
      // Shouldn't handle redirect with `electron.net`, this is for https.get fallback
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, to).then(resolve).catch(reject);
      }
      res.pipe(_fs2.default.createWriteStream(to)).on('close', resolve);
    });
    req.on('error', reject);
    req.end();
  });
};