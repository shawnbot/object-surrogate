# object-surrogate
Create object proxies with property accessors bound to data.

```js
var surrogate = require('object-surrogate');
var assert = require('assert');

var data = {
  x: 1
};

var proxy = surrogate(data, {
  y: function(d) { return d.x + 1; }
});

// own properties are preserved if not overwritten by the proxy
assert.equal(proxy.x, 1);
assert.equal(proxy.y, 2);
```

Objects are proxied deeply, so you can define nested properties:

```js
var person = {
  first_name: 'Joe',
  last_name: 'Blow'
};

var personProxy = {
  name: {
    first: function(d) { return d.first_name; },
    last: function(d) { return d.last_name; },
    full: function(d) {
      return [d.first_name, d.last_name].join(' ');
    }
  }
};

var proxy = surrogate(person, personProxy);

assert.equal(proxy.name.first, 'Joe');
assert.equal(proxy.name.last, 'Blow');
assert.equal(proxy.name.full, 'Joe Blow');
```

Arrays are mapped to surrogates of their values:

```js
var people = [person];
var proxies = surrogate(people, personProxy);
assert.equal(proxies[0].name.full, 'Joe Blow');
```
