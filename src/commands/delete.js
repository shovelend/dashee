'use strict';

const fs = require('fs-extra');

module.exports = async (publisher, dashboardTitle, opts) => {
  const filename = `${__dirname}/../publishers/${publisher}/delete.js`;

  if (!fs.pathExistsSync(filename)) {
    throw new Error(`Unable to find a publisher for destination "${publisher}". Ensure the "publishers" folder contains a folder named after the publisher and the "delete.js" file exists.`);
  }

  return require(filename)(dashboardTitle, opts);
};
