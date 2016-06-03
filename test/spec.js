const assert = require('assert');
const objectProxy = require('../');

describe('proxied objects', function() {

  it('copies values from the original object', function() {
    var x = {a: 1};
    assert.strictEqual(objectProxy({foo: x}, {}).foo, x);
  });

  it('proxies accessors', function() {
    assert.equal(objectProxy({x: 1}, {
      x: d => d.x + 1
    }).x, 2);
  });

  it('proxies nested accessors', function() {
    assert.equal(objectProxy({x: 1}, {
      x: {
        y: d => d.x + 1
      }
    }).x.y, 2);
  });

});

describe('proxied values', function() {

  it('proxies static values', function() {
    assert.equal(objectProxy({x: 1}, {y: 2}).y, 2);
  });

});

describe('proxied arrays', function() {

  it('proxies arrays', function() {
    var proxy = objectProxy([{x: 1}, {x: 2}], {
      x: d => d.x + 1
    });
    assert.deepEqual(proxy, [{x: 2}, {x: 3}]);
  });

});

describe('errors', function() {

  it('throws when the target is not an Object or Array', function() {
    assert.throws(() => objectProxy(null, {}));
    assert.throws(() => objectProxy(undefined, {}));
    assert.throws(() => objectProxy(123, {}));
    assert.throws(() => objectProxy('abc', {}));
  });
});
