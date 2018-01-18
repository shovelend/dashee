'use strict';

const fs = require('fs-extra');
const _ = require('lodash');

function loadJson(filename) {
  if (!fs.pathExistsSync(filename)) {
    throw new Error(`Unable to open JSON file named '${filename}'.`);
  }

  return fs.readJsonSync(filename);
}

module.exports = (srcFilename, destFilename, opts) => {
  const fromMap = require(`${__dirname}/map.js`);
  const srcObject = loadJson(srcFilename);
  const version = srcObject.version || '2';
  const mapper = require(`${__dirname}/mapper_v${version}`);

  return mapper(fromMap, srcObject, destFilename, opts);
};
