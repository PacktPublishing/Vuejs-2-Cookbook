'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/* global process */
/* eslint no-param-reassign: 0 */

/**
 * Wrap a function calling a callback into one that returns a promise.
 *
 * @param {Function} func - the function to wrap
 * @param {number} paramsCountExcludingCb - #params in func signature before the callback
 * @returns {Function} function which returns a promise
 *
 * The wrapped func is always called with paramsCountExcludingCb params, the last of which is the
 * wrapper's own callback. A correct count ensures the wrapped func will be called correctly.
 *
 * function abc(a, b, c, callback) { callback(null, { data: 'data' }); }
 * const promiseFunc = fnPromisifyCallback(abc, 3);
 *
 * promiseFunc('a', 'b', 'c'); // abc('a', 'b', 'c', wrappersCb)
 * promiseFunc('a', 'b'); // abc('a', 'b', undefined, wrappersCb)
 * promiseFunc(); // abc(undefined, undefined, undefined, wrappersCb)
 * promiseFunc('a', 'b', 'c', 'd', 'e'); // abc('a', 'b', 'c', wrappersCb)
 */
var callbackToPromise = function callbackToPromise(func, paramsCountExcludingCb) {
  paramsCountExcludingCb = Math.max(paramsCountExcludingCb, 0);

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var self = undefined;

    // Get the correct number of args
    var argsLen = args.length;
    if (argsLen < paramsCountExcludingCb) {
      // Array.apply(null, Array(5)) creates a dense array of 5 undefined
      var extraArgs = Array.apply(null, Array(paramsCountExcludingCb - argsLen));
      args = Array.prototype.concat.call(args, extraArgs);
    }
    if (args.length > paramsCountExcludingCb) {
      args = Array.prototype.slice.call(args, 0, paramsCountExcludingCb);
    }

    return new Promise(function (resolve, reject) {
      // eslint-disable-line consistent-return
      args.push(function (err, data) {
        return err ? reject(err) : resolve(data);
      });
      func.apply(self, args);
    });
  };
};

var asap = process && typeof process.nextTick === 'function' ? process.nextTick : setImmediate;

/**
 * Convert a Promise to a callback running in a scope outside the Promise chain.
 * The promise chain will not be invoked should the callback throw.
 *
 * @param {Promise} promise - the promise to convert
 * @returns {Function} func(cb)
 *
 * function (cb) {
 *   const promise = new Promise( ...).then( ... ).catch( ... );
 *   ...
 *   promiseToCallback(promise)(cb);
 *
 *   promise.then( ... ); // this is still possible
 * }
 */
function promiseToCallback(promise) {
  return function (cb) {
    promise.then(function (data) {
      asap(cb, null, data);
      return data;
    }, function (err) {
      asap(cb, err);
    });

    return null;
  };
}

exports.callbackToPromise = callbackToPromise;
exports.promiseToCallback = promiseToCallback;