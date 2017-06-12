'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _crossUnzip = require('cross-unzip');

var _crossUnzip2 = _interopRequireDefault(_crossUnzip);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadChromeExtension = function downloadChromeExtension(chromeStoreID, forceDownload) {
  var attempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

  var extensionsStore = (0, _utils.getPath)();
  if (!_fs2.default.existsSync(extensionsStore)) {
    _fs2.default.mkdirSync(extensionsStore);
  }
  var extensionFolder = _path2.default.resolve(extensionsStore + '/' + chromeStoreID);
  return new Promise(function (resolve, reject) {
    if (!_fs2.default.existsSync(extensionFolder) || forceDownload) {
      (function () {
        if (_fs2.default.existsSync(extensionFolder)) {
          _rimraf2.default.sync(extensionFolder);
        }
        var fileURL = 'https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D' + chromeStoreID + '%26uc&prodversion=32'; // eslint-disable-line
        var filePath = _path2.default.resolve(extensionFolder + '.crx');
        (0, _utils.downloadFile)(fileURL, filePath).then(function () {
          (0, _crossUnzip2.default)(filePath, extensionFolder, function (err) {
            if (err && !_fs2.default.existsSync(_path2.default.resolve(extensionFolder, 'manifest.json'))) {
              return reject(err);
            }
            resolve(extensionFolder);
          });
        }).catch(function (err) {
          console.log('Failed to fetch extension, trying ' + (attempts - 1) + ' more times'); // eslint-disable-line
          if (attempts <= 1) {
            return reject(err);
          }
          setTimeout(function () {
            downloadChromeExtension(chromeStoreID, forceDownload, attempts - 1).then(resolve).catch(reject);
          }, 200);
        });
      })();
    } else {
      resolve(extensionFolder);
    }
  });
};

exports.default = downloadChromeExtension;