/**
 * Module Dependencies
 */

var join = require('path').join;
var assert = require('assert');
var str2js = require('../');
var Duo = require('duo');
var vm = require('vm');

/**
 * Tests
 */

describe('duo-string-to-js', function() {
  
  it('should support html', function *() {
    var duo = build('html');
    duo.use(str2js());
    var js = yield duo.run();
    var ctx = evaluate(js).main;
    assert('<h1>hi world!</h1>\n' == ctx);
  });
})

/**
 * Build js `fixture` and return `str`.
 *
 * @param {String} fixture
 * @return {String}
 */

function build(fixture, file){
  var root = path(fixture);
  var duo = Duo(root).entry(file || 'index.js');
  return duo;
}

/**
 * Path to `fixture`
 */

function path(fixture){
  return join(__dirname, 'fixtures', fixture);
}

/**
 * Evaluate `js`.
 *
 * @return {Object}
 */

function evaluate(js, ctx){
  var ctx = { window: {}, document: {} };
  vm.runInNewContext('main =' + js + '(1)', ctx, 'main.vm');
  vm.runInNewContext('require =' + js + '', ctx, 'require.vm');
  return ctx;
}
