'use strict';

const fs = require('fs-extra');

module.exports = (publisher, sourceFilename, opts) => {
  const filename = `${__dirname}/../publishers/${publisher}/index.js`;

  if (!fs.pathExistsSync(filename)) {
    throw new Error(`Unable to find a publisher for destination "${publisher}". Ensure the "publishers" folder contains a folder named after the publisher.`);
  }

  if (!fs.pathExistsSync(sourceFilename)) {
    throw new Error(`Unable to find a source file "${sourceFilename}".`);
  }

  return require(filename)(sourceFilename, opts);
};
