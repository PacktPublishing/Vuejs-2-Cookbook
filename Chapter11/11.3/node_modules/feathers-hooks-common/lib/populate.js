'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _utils = require('./utils');

var _bundled = require('./bundled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var populate = exports.populate = function populate(options) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  if (typeof options === 'string') {
    return _bundled.legacyPopulate.apply(undefined, [options].concat(rest));
  }

  return function (hook) {
    var optionsDefault = {
      schema: {},
      checkPermissions: function checkPermissions() {
        return true;
      },
      profile: false
    };

    if (hook.params._populate === 'skip') {
      // this service call made from another populate
      return hook;
    }

    return Promise.resolve().then(function () {
      // 'options.schema' resolves to { permissions: '...', include: [ ... ] }

      var items = (0, _utils.getItems)(hook);
      var options1 = Object.assign({}, optionsDefault, options);
      var schema = options1.schema,
          checkPermissions = options1.checkPermissions;

      var schema1 = typeof schema === 'function' ? schema(hook, options1) : schema;
      var permissions = schema1.permissions || null;

      if (typeof checkPermissions !== 'function') {
        throw new _feathersErrors2.default.BadRequest('Permissions param is not a function. (populate)');
      }

      if (permissions && !checkPermissions(hook, hook.path, permissions, 0)) {
        throw new _feathersErrors2.default.BadRequest('Permissions do not allow this populate. (populate)');
      }

      if ((typeof schema1 === 'undefined' ? 'undefined' : _typeof(schema1)) !== 'object') {
        throw new _feathersErrors2.default.BadRequest('Schema does not resolve to an object. (populate)');
      }

      return !schema1.include || !Object.keys(schema1.include).length ? items : populateItemArray(options1, hook, items, schema1.include, 0);
    }).then(function (items) {
      (0, _utils.replaceItems)(hook, items);
      return hook;
    });
  };
};

function populateItemArray(options, hook, items, includeSchema, depth) {
  // 'items' is an item or an array of items
  // 'includeSchema' is like [ { nameAs: 'author', ... }, { nameAs: 'readers', ... } ]

  if (!Array.isArray(items)) {
    return populateItem(options, hook, items, includeSchema, depth + 1);
  }

  return Promise.all(items.map(function (item) {
    return populateItem(options, hook, item, includeSchema, depth + 1);
  }));
}

function populateItem(options, hook, item, includeSchema, depth) {
  // 'item' is one item
  // 'includeSchema' is like [ { nameAs: 'author', ... }, { nameAs: 'readers', ... } ]

  var elapsed = {};
  var startAtAllIncludes = process.hrtime();
  item._include = [];

  return Promise.all(includeSchema.map(function (childSchema) {
    var startAtThisInclude = process.hrtime();
    return populateAddChild(options, hook, item, childSchema, depth).then(function (result) {
      var nameAs = childSchema.nameAs || childSchema.service;
      elapsed[nameAs] = getElapsed(options, startAtThisInclude, depth);

      return result;
    });
  })).then(function (children) {
    // 'children' is like [{ authorInfo: {...}, readersInfo: [{...}, {...}] }]
    if (options.profile !== false) {
      elapsed.total = getElapsed(options, startAtAllIncludes, depth);
      item._elapsed = elapsed;
    }

    return Object.assign.apply(Object, [item].concat(_toConsumableArray(children)));
  });
}

function populateAddChild(options, hook, parentItem, childSchema, depth) {
  /*
  'parentItem' is the item we are adding children to
  'childSchema' is like
    { service: 'comments',
      permissions: '...',
      nameAs: 'comments',
      asArray: true,
      parentField: 'id',
      childField: 'postId',
      query: { $limit: 5, $select: ['title', 'content', 'postId'], $sort: { createdAt: -1 } },
      select: (hook, parent, depth) => ({ something: { $exists: false }}),
      include: [ ... ],
    }
  */

  // note: parentField & childField are req'd, plus parentItem[parentField} !== undefined .
  // childSchema.select may override their relationship but some relationship must be given.
  if (!childSchema.service || !childSchema.parentField || !childSchema.childField) {
    throw new _feathersErrors2.default.BadRequest('Child schema is missing a required property. (populate)');
  }

  if (childSchema.permissions && !options.checkPermissions(hook, childSchema.service, childSchema.permissions, depth)) {
    throw new _feathersErrors2.default.BadRequest('Permissions for ' + childSchema.service + ' do not allow include. (populate)');
  }

  var nameAs = childSchema.nameAs || childSchema.service;
  parentItem._include.push(nameAs);

  var promise = Promise.resolve().then(function () {
    return childSchema.select ? childSchema.select(hook, parentItem, depth) : {};
  }).then(function (selectQuery) {
    var parentVal = (0, _utils.getByDot)(parentItem, childSchema.parentField);

    if (parentVal === undefined) {
      throw new _feathersErrors2.default.BadRequest('ParentField ' + childSchema.parentField + ' for ' + nameAs + ' depth ' + depth + ' is undefined. (populate)');
    }

    var query = Object.assign({}, childSchema.query, _defineProperty({}, childSchema.childField, Array.isArray(parentVal) ? { $in: parentVal } : parentVal), selectQuery // dynamic options override static ones
    );

    var serviceHandle = hook.app.service(childSchema.service);

    if (!serviceHandle) {
      throw new _feathersErrors2.default.BadRequest('Service ' + childSchema.service + ' is not configured. (populate)');
    }

    return serviceHandle.find({ query: query, _populate: 'skip' });
  }).then(function (result) {
    result = result.data || result;

    if (result.length === 1 && !childSchema.asArray) {
      result = result[0];
    }

    return result;
  });

  if (childSchema.include) {
    promise = promise.then(function (items) {
      return populateItemArray(options, hook, items, childSchema.include, depth);
    });
  }

  return promise.then(function (items) {
    return _defineProperty({}, nameAs, items);
  });
}

// Helpers

function getElapsed(options, startHrtime, depth) {
  if (options.profile === true) {
    var elapsed = process.hrtime(startHrtime);
    return elapsed[0] * 1e9 + elapsed[1];
  } else if (options.profile !== false) {
    return depth; // for testing _elapsed
  }
}