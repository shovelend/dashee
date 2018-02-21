'use strict';

const request = require('request-promise');

function ensureExists(opts, key, option) {
  if (!opts) {
    throw new Error('Missing required options. Add "--help" to see the available options');
  }

  if (!opts[key]) {
    throw new Error(`Missing required option: ${option}`);
  }
}

function convertDashboardTitleToSlug(dashboardTitle) {
  return encodeURIComponent(dashboardTitle.toLowerCase().replace(/ /g, '-'));
}

module.exports = (dashboardTitle, opts) => {
  ensureExists(opts, 'grafanaKey', '--grafana-key');

  const dashboardSlug = convertDashboardTitleToSlug(dashboardTitle);

  return request({
    method: 'DELETE',
    uri: `http://grafana.dun.fh:3000/api/dashboards/db/${dashboardSlug}`,
    headers: {
      Authorization: `Bearer ${opts.grafanaKey}`
    }
  })
  .then(result => {
    console.log(`Delete successful for: "${dashboardTitle}"`);
    console.log(result);
  })
  .catch(e => {
    throw new Error(`Unable to delete dashboard "${dashboardTitle}" from Grafana. error is:\n${e}`);
  });
}
