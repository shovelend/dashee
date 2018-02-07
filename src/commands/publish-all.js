'use strict';

const fs = require('fs-extra');
const _ = require('lodash');
const publish = require('./publish')

module.exports = (publisher, serviceName, path, opts) => {
  const filename = `${__dirname}/../publishers/${publisher}/index.js`;

  if (!fs.pathExistsSync(filename)) {
    throw new Error(`Unable to find a publisher for destination "${publisher}". Ensure the "publishers" folder contains a folder named after the publisher.`);
  }

  let files = fs.readdirSync(path);

  files = _.filter(files, filename => {
    const expr = new RegExp(`^${serviceName}(.*)\.json$`);

    return filename.match(expr) && !filename.includes('generic');
  });

  files.forEach(filename => {
    console.log(filename);
    (async function () {
      const publish = require('./publish');
      await publish(publisher, filename, opts);
    })();
  });
};
