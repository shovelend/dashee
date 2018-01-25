'use strict';

const fs = require('fs-extra');
const objectMapper = require('object-mapper');
const _ = require('lodash');

function loadJson(filename) {
  if (!fs.pathExistsSync(filename)) {
    throw new Error(`Unable to open JSON file named '${filename}'.`);
  }

  return fs.readJsonSync(filename);
}

function mapRows(dashboard, map) {
  const widgetMappers = map.widgetMapper();
  let widgetNum = 0;
  const rows = [];
  dashboard.rows.forEach(row => {
    const panels = [];

    row.widgets.forEach(widget => {
      if (widgetMappers[widget.widget.type]) {
        const result = objectMapper(widget, widgetMappers[widget.widget.type]);
        result.id = ++widgetNum;
        panels.push(result);
        // console.log(`===> Pushing ${widget.widget.type}`);
      }
      else {
        console.info(`Unable to find mapper for widget of type: ${widget.widget.type}`);
      }
    });
    // console.log(panels);
    rows.push({collapse: false, height: 363, panels: panels});
  });

  return rows;
}

function mapDashboard(dashboard, map) {
  return objectMapper(dashboard, map.dashboardMapper())
}

function buildDashboard(dashboard, dashboardName, map, destFilename) {
  const filename = `${destFilename}-${dashboardName}.json`;
  const grafanaDashboard = loadJson(`${__dirname}/template.json`);

  grafanaDashboard.dashboard.rows = mapRows(dashboard, map);
  const dashboardMappedResult = mapDashboard(dashboard, map);

  Object.assign(grafanaDashboard.dashboard, dashboardMappedResult);

  console.log(JSON.stringify(grafanaDashboard));
  fs.writeJsonSync(filename, grafanaDashboard);
}

module.exports = (map, srcObject, destFilename, opts) => {
  _.forOwn(srcObject.dashboards, (dashboard, dashboardName) =>
    buildDashboard(dashboard, dashboardName, map, destFilename));
};
