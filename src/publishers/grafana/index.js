'use strict';

const request = require('request-promise');
const fs = require('fs-extra');

function ensureExists(opts, key, option) {
  if (!opts) {
    throw new Error('Missing required options. Add "--help" to see the available options');
  }

  if (!opts[key]) {
    throw new Error(`Missing required option: ${option}`);
  }
}

 module.exports = (sourceFilename, opts) => {
  ensureExists(opts, 'grafanaKey', '--grafana-key');

  const jsonToUpload = fs.readJsonSync(sourceFilename);

  return request({
    method: 'POST',
    uri: 'http://grafana.dun.fh:3000/api/dashboards/db',
    json: jsonToUpload,
    headers: {
      Authorization: `Bearer ${opts.grafanaKey}`
    }
  })
  .then(result => {
    console.log(`Upload successful for: ${sourceFilename}`);
    console.log(result);
  })
  .catch(e => {
    throw new Error(`Unable to upload "${sourceFilename}" to Grafana. error is:\n${e}`);
  });
}
