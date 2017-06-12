// Load our dependencies
var fs = require('fs');
var path = require('path');
var minstache = require('minstache');
var jsStringEscape = require('js-string-escape');
var convertSourceMap = require('convert-source-map');

// Resolve filepath to Karma's `context.html` and `debug.html`
// https://github.com/karma-runner/karma/blob/v1.3.0/lib/middleware/karma.js#L138-L157
// https://github.com/karma-runner/karma/blob/v1.3.0/lib/web-server.js#L33-L37
// https://github.com/karma-runner/karma/blob/v1.3.0/lib/middleware/common.js#L30-L70
var karmaWebServerFilepath = require.resolve('karma/lib/web-server');
var karmaStaticDirectoryFilepath = path.normalize(path.join(path.dirname(karmaWebServerFilepath), '/../static'));
// Example: /home/todd/github/karma-electron/node_modules/karma/static/context.html
var karmaDefaultContextFile = karmaStaticDirectoryFilepath + '/context.html';
var karmaDefaultDebugFile = karmaStaticDirectoryFilepath + '/debug.html';

// Load our template
// DEV: We minify to remove impact of line numbers
//   To reproduce this, make a test fail and remove minification
//   Notice how the error line goes from 10 to 30 =(
// DEV: We should be using a minifier but the mustache template prevents this
var templateStr = fs.readFileSync(__dirname + '/node-integration-iframe.mustache.js', 'utf8');
var minifiedTemplateStr = templateStr.replace(/\/\/[^\n]+/g, '\n').replace(/\n/g, '');
// DEV: Fix up JSCS work arounds
minifiedTemplateStr = minifiedTemplateStr.replace(/{{if_/g, '{{#')
  .replace(/{{notif_/g, '{{^').replace(/{{end_/g, '{{/');
// DEV: We inject a newline after content to prevent `//` comments from breaking our closure
minifiedTemplateStr = minifiedTemplateStr.replace(/(content}})/, '$1\n');
var template = minstache.compile(minifiedTemplateStr);

// Define our framework to inject our `node-integration`
var $inject = ['config.basePath', 'config.client', 'config.customContextFile', 'config.customDebugFile'];
function createElectronPreprocessor(karmaBasePath, karmaClientConfig, karmaCustomContextFile, karmaCustomDebugFile) {
  // Generate our preprocessor function
  function electronPreprocessor(content, file, done) {
    // Render our content without a source map
    var sourceMap = convertSourceMap.fromSource(content);
    var output = template({
      __filenameOverride: karmaClientConfig.__filenameOverride,
      content: convertSourceMap.removeComments(content),
      dirname: jsStringEscape(path.dirname(file.originalPath)),
      filename: jsStringEscape(file.originalPath),
      karmaBasePath: jsStringEscape(karmaBasePath),
      karmaContextFile: jsStringEscape(karmaCustomContextFile || karmaDefaultContextFile),
      karmaDebugFile: jsStringEscape(karmaCustomDebugFile || karmaDefaultDebugFile),
      loadScriptsViaRequire: !!karmaClientConfig.loadScriptsViaRequire,
      sep: jsStringEscape(path.sep)
    });

    // If there was a source map, add it back
    if (sourceMap) {
      output += '\n' + sourceMap.toComment();
    }

    // Callback with our content
    done(null, output);
  }

  // Return our preprocessor
  return electronPreprocessor;
}

// Define depenencies so our function can receive them
createElectronPreprocessor.$inject = $inject;

// Export our launcher
module.exports = {
  'preprocessor:electron': ['factory', createElectronPreprocessor]
};
