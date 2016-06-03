'use strict';

const assign = require('object-assign');

const identity = d => d;
const functor = d => () => d;

const objectProxy = function(target, fields, context) {
  if (Array.isArray(target)) {
    return target.map(d => objectProxy(d, fields, context));
  } else if (!target || typeof target !== 'object') {
    throw new Error('expected Object or Array for target; got '
                    + (typeof target));
  }

  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    throw new Error('expected Object literal for fields; got '
                    + (typeof fields));
  }

  let proxy = assign({}, target);
  context = context || proxy;

  Object.keys(fields).forEach(key => {
    var value = fields[key];
    var prop;
    switch (typeof value) {
      case 'object':
        if (Array.isArray(value)) {
          throw new Error('proxied array fields are non-sensical');
        } else {
          prop = {value: objectProxy(target, value, context)};
        }
        break;

      case 'function':
        prop = {get: value.bind(context, target)};
        break;
    }

    Object.defineProperty(proxy, key, prop || {
      value: value
    });
  });
  
  return proxy;
};

module.exports = objectProxy;
