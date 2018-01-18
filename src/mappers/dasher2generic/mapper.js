'use strict';

const fs = require('fs-extra');
const _ = require('lodash');
const yamlParser = require('js-yaml');

function loadYaml(filename) {
  if (!fs.pathExistsSync(filename)) {
    throw new Error(`Unable to open YAML file named '${filename}'.`);
  }

  return yamlParser.safeLoad(fs.readFileSync(filename));
}

module.exports = (srcFilename, destFilename, opts) => {
  const fromMap = require(`${__dirname}/map.js`);
  const srcObject = loadYaml(srcFilename);
  const mapper = require(`${__dirname}/mapper_dasher`);

  return mapper(fromMap, srcObject, destFilename, opts);
};
