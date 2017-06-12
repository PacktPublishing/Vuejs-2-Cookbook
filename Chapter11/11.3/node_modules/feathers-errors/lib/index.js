'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var debug = require('debug')('feathers-errors');

// NOTE (EK): Babel doesn't properly support extending
// some classes in ES6. The Error class being one of them.
// Node v5.0+ does support this but until we want to drop support
// for older versions we need this hack.
// http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node
// https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend

var FeathersError = function (_extendableBuiltin2) {
  _inherits(FeathersError, _extendableBuiltin2);

  function FeathersError(msg, name, code, className, data) {
    _classCallCheck(this, FeathersError);

    msg = msg || 'Error';

    var errors = void 0;
    var message = void 0;
    var newData = void 0;

    if (msg instanceof Error) {
      message = msg.message || 'Error';

      // NOTE (EK): This is typically to handle validation errors
      if (msg.errors) {
        errors = msg.errors;
      }
    } else if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
      // Support plain old objects
      message = msg.message || 'Error';
      data = msg;
    } else {
      // message is just a string
      message = msg;
    }

    if (data) {
      // NOTE(EK): To make sure that we are not messing
      // with immutable data, just make a copy.
      // https://github.com/feathersjs/feathers-errors/issues/19
      newData = _extends({}, data);

      if (newData.errors) {
        errors = newData.errors;
        delete newData.errors;
      }
    }

    // NOTE (EK): Babel doesn't support this so
    // we have to pass in the class name manually.
    // this.name = this.constructor.name;
    var _this = _possibleConstructorReturn(this, (FeathersError.__proto__ || Object.getPrototypeOf(FeathersError)).call(this, message));

    _this.type = 'FeathersError';
    _this.name = name;
    _this.message = message;
    _this.code = code;
    _this.className = className;
    _this.data = newData;
    _this.errors = errors || {};

    debug(_this.name + '(' + _this.code + '): ' + _this.message);
    return _this;
  }

  // NOTE (EK): A little hack to get around `message` not
  // being included in the default toJSON call.


  _createClass(FeathersError, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
        className: this.className,
        data: this.data,
        errors: this.errors
      };
    }
  }]);

  return FeathersError;
}(_extendableBuiltin(Error));

var BadRequest = function (_FeathersError) {
  _inherits(BadRequest, _FeathersError);

  function BadRequest(message, data) {
    _classCallCheck(this, BadRequest);

    return _possibleConstructorReturn(this, (BadRequest.__proto__ || Object.getPrototypeOf(BadRequest)).call(this, message, 'BadRequest', 400, 'bad-request', data));
  }

  return BadRequest;
}(FeathersError);

var NotAuthenticated = function (_FeathersError2) {
  _inherits(NotAuthenticated, _FeathersError2);

  function NotAuthenticated(message, data) {
    _classCallCheck(this, NotAuthenticated);

    return _possibleConstructorReturn(this, (NotAuthenticated.__proto__ || Object.getPrototypeOf(NotAuthenticated)).call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data));
  }

  return NotAuthenticated;
}(FeathersError);

var PaymentError = function (_FeathersError3) {
  _inherits(PaymentError, _FeathersError3);

  function PaymentError(message, data) {
    _classCallCheck(this, PaymentError);

    return _possibleConstructorReturn(this, (PaymentError.__proto__ || Object.getPrototypeOf(PaymentError)).call(this, message, 'PaymentError', 402, 'payment-error', data));
  }

  return PaymentError;
}(FeathersError);

var Forbidden = function (_FeathersError4) {
  _inherits(Forbidden, _FeathersError4);

  function Forbidden(message, data) {
    _classCallCheck(this, Forbidden);

    return _possibleConstructorReturn(this, (Forbidden.__proto__ || Object.getPrototypeOf(Forbidden)).call(this, message, 'Forbidden', 403, 'forbidden', data));
  }

  return Forbidden;
}(FeathersError);

var NotFound = function (_FeathersError5) {
  _inherits(NotFound, _FeathersError5);

  function NotFound(message, data) {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).call(this, message, 'NotFound', 404, 'not-found', data));
  }

  return NotFound;
}(FeathersError);

var MethodNotAllowed = function (_FeathersError6) {
  _inherits(MethodNotAllowed, _FeathersError6);

  function MethodNotAllowed(message, data) {
    _classCallCheck(this, MethodNotAllowed);

    return _possibleConstructorReturn(this, (MethodNotAllowed.__proto__ || Object.getPrototypeOf(MethodNotAllowed)).call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data));
  }

  return MethodNotAllowed;
}(FeathersError);

var NotAcceptable = function (_FeathersError7) {
  _inherits(NotAcceptable, _FeathersError7);

  function NotAcceptable(message, data) {
    _classCallCheck(this, NotAcceptable);

    return _possibleConstructorReturn(this, (NotAcceptable.__proto__ || Object.getPrototypeOf(NotAcceptable)).call(this, message, 'NotAcceptable', 406, 'not-acceptable', data));
  }

  return NotAcceptable;
}(FeathersError);

var Timeout = function (_FeathersError8) {
  _inherits(Timeout, _FeathersError8);

  function Timeout(message, data) {
    _classCallCheck(this, Timeout);

    return _possibleConstructorReturn(this, (Timeout.__proto__ || Object.getPrototypeOf(Timeout)).call(this, message, 'Timeout', 408, 'timeout', data));
  }

  return Timeout;
}(FeathersError);

var Conflict = function (_FeathersError9) {
  _inherits(Conflict, _FeathersError9);

  function Conflict(message, data) {
    _classCallCheck(this, Conflict);

    return _possibleConstructorReturn(this, (Conflict.__proto__ || Object.getPrototypeOf(Conflict)).call(this, message, 'Conflict', 409, 'conflict', data));
  }

  return Conflict;
}(FeathersError);

var LengthRequired = function (_FeathersError10) {
  _inherits(LengthRequired, _FeathersError10);

  function LengthRequired(message, data) {
    _classCallCheck(this, LengthRequired);

    return _possibleConstructorReturn(this, (LengthRequired.__proto__ || Object.getPrototypeOf(LengthRequired)).call(this, message, 'LengthRequired', 411, 'length-required', data));
  }

  return LengthRequired;
}(FeathersError);

var Unprocessable = function (_FeathersError11) {
  _inherits(Unprocessable, _FeathersError11);

  function Unprocessable(message, data) {
    _classCallCheck(this, Unprocessable);

    return _possibleConstructorReturn(this, (Unprocessable.__proto__ || Object.getPrototypeOf(Unprocessable)).call(this, message, 'Unprocessable', 422, 'unprocessable', data));
  }

  return Unprocessable;
}(FeathersError);

var TooManyRequests = function (_FeathersError12) {
  _inherits(TooManyRequests, _FeathersError12);

  function TooManyRequests(message, data) {
    _classCallCheck(this, TooManyRequests);

    return _possibleConstructorReturn(this, (TooManyRequests.__proto__ || Object.getPrototypeOf(TooManyRequests)).call(this, message, 'TooManyRequests', 429, 'too-many-requests', data));
  }

  return TooManyRequests;
}(FeathersError);

var GeneralError = function (_FeathersError13) {
  _inherits(GeneralError, _FeathersError13);

  function GeneralError(message, data) {
    _classCallCheck(this, GeneralError);

    return _possibleConstructorReturn(this, (GeneralError.__proto__ || Object.getPrototypeOf(GeneralError)).call(this, message, 'GeneralError', 500, 'general-error', data));
  }

  return GeneralError;
}(FeathersError);

var NotImplemented = function (_FeathersError14) {
  _inherits(NotImplemented, _FeathersError14);

  function NotImplemented(message, data) {
    _classCallCheck(this, NotImplemented);

    return _possibleConstructorReturn(this, (NotImplemented.__proto__ || Object.getPrototypeOf(NotImplemented)).call(this, message, 'NotImplemented', 501, 'not-implemented', data));
  }

  return NotImplemented;
}(FeathersError);

var BadGateway = function (_FeathersError15) {
  _inherits(BadGateway, _FeathersError15);

  function BadGateway(message, data) {
    _classCallCheck(this, BadGateway);

    return _possibleConstructorReturn(this, (BadGateway.__proto__ || Object.getPrototypeOf(BadGateway)).call(this, message, 'BadGateway', 502, 'bad-gateway', data));
  }

  return BadGateway;
}(FeathersError);

var Unavailable = function (_FeathersError16) {
  _inherits(Unavailable, _FeathersError16);

  function Unavailable(message, data) {
    _classCallCheck(this, Unavailable);

    return _possibleConstructorReturn(this, (Unavailable.__proto__ || Object.getPrototypeOf(Unavailable)).call(this, message, 'Unavailable', 503, 'unavailable', data));
  }

  return Unavailable;
}(FeathersError);

var errors = {
  FeathersError: FeathersError,
  BadRequest: BadRequest,
  NotAuthenticated: NotAuthenticated,
  PaymentError: PaymentError,
  Forbidden: Forbidden,
  NotFound: NotFound,
  MethodNotAllowed: MethodNotAllowed,
  NotAcceptable: NotAcceptable,
  Timeout: Timeout,
  Conflict: Conflict,
  LengthRequired: LengthRequired,
  Unprocessable: Unprocessable,
  TooManyRequests: TooManyRequests,
  GeneralError: GeneralError,
  NotImplemented: NotImplemented,
  BadGateway: BadGateway,
  Unavailable: Unavailable,
  400: BadRequest,
  401: NotAuthenticated,
  402: PaymentError,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  408: Timeout,
  409: Conflict,
  411: LengthRequired,
  422: Unprocessable,
  429: TooManyRequests,
  500: GeneralError,
  501: NotImplemented,
  502: BadGateway,
  503: Unavailable
};

function convert(error) {
  if (!error) {
    return error;
  }

  var FeathersError = errors[error.name];
  var result = FeathersError ? new FeathersError(error.message, error.data) : new Error(error.message || error);

  if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
    _extends(result, error);
  }

  return result;
}

exports.default = _extends({
  convert: convert,
  types: errors,
  errors: errors
}, errors);
module.exports = exports['default'];