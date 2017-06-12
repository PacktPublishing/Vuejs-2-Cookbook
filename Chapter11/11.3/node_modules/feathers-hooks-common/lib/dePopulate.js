'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dePopulate = undefined;

var _utils = require('./utils');

var dePopulate = exports.dePopulate = function dePopulate() {
  return function (hook) {
    var items = (0, _utils.getItems)(hook);

    (Array.isArray(items) ? items : [items]).forEach(function (item) {
      removeProps('_computed', item);
      removeProps('_include', item);
      delete item._elapsed;
    });

    (0, _utils.replaceItems)(hook, items);
    return hook;
  };
};

function removeProps(name, item) {
  if (name in item) {
    item[name].forEach(function (key) {
      delete item[key];
    });
    delete item[name];
  }
}