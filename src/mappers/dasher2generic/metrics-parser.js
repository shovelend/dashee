'use strict';

const _ = require('lodash');

module.exports = (functions, key) => {
  return _.reduce(functions, (acc, f) => {
    const index = f.indexOf('(');
    const start = f.substr(0, index + 1);
    const end = f.substr(index + 1);

    return `${start}${acc}, ${end}`;
  }, key);
}
