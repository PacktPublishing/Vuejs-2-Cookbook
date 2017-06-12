'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('se service', function() {
  it('registered the ses service', () => {
    assert.ok(app.service('ses'));
  });
});
