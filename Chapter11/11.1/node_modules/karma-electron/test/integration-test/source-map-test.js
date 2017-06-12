// Load in our dependencies
var assert = require('assert');
var fs = require('fs');
var request = require('request');
// DEV: This resolve from `context.html` in `karma` so we need a lot of `../`
// DEV: We avoid using `loadScriptsViaRequire` as we want to test trailing source map behavior
var sourceMapTestFilepath = __dirname + '/../../../test/integration-test/source-map-test.js';

// Start our tests
describe('A file with a source map loaded with karma-electron', function () {
  before(function retrieveHttpFile (done) {
    // Retrieve karma-electron processed HTTP body
    var that = this;
    request('http://localhost:9876/base/source-map-test.js', function handleRequest (err, res, body) {
      that.httpBody = body;
      done(err);
    });
  });
  after(function cleanup () {
    delete this.httpBody;
  });

  it('preserves its source map', function () {
    // Load in our fs lines
    // DEV: We might have a trailing new line so we fallback
    var fsLines = fs.readFileSync(sourceMapTestFilepath, 'utf8').split(/\n/g);
    var fsLastLine = fsLines[fsLines.length - 1] || fsLines[fsLines.length - 2];

    // Load in our HTTP lines
    var httpLines = this.httpBody.split(/\n/g);
    var httpLastLine = httpLines[httpLines.length - 1];

    // Compare our fs to our HTTP last line
    assert.strictEqual(fsLastLine, httpLastLine);
  });
});
// Via https://github.com/thlorenz/convert-source-map
// jscs:disable
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vLmpzIiwic291cmNlcyI6WyJjb25zb2xlLmxvZyhcImhpXCIpOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIvIn0=
