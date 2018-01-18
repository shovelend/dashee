'use strict';

const fs = require('fs-extra');

module.exports = (mapperName, srcFilename, destFilename, opts) => {
  const mapper = require(`../mappers/${mapperName}/mapper`);

  return mapper(srcFilename, destFilename, opts);
}
