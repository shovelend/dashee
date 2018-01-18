'use strict';

const transform = require('../modules/transform');

module.exports = (mapperName, srcFilename, destFilename, opts) => {
  return transform(mapperName, srcFilename, destFilename, opts);
};
