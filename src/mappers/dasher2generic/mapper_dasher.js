'use strict';

const fs = require('fs-extra');
const _ = require('lodash');
const objectMapper = require('object-mapper');

function loadJson(filename) {
  if (!fs.pathExistsSync(filename)) {
    throw new Error(`Unable to open JSON file named '${filename}'.`);
  }

  return fs.readJsonSync(filename);
}

const newWidgets  = () => ({
  widgets: []
});

function mapRows(dashboard, map, datasources) {
  const widgetMappers = map.widgetMapper();
  const rows = [];
  let widgets = newWidgets();
  let widgetPositionInRow = 0;
  const maxPosition = 4;

  _.forOwn(dashboard.widgets, widget => {
    if (widgetMappers[widget.type]) {
        const widgetWithDatasource = Object.assign({}, widget, { datasources: datasources});

        const result = objectMapper(widgetWithDatasource, widgetMappers[widget.type]);
        widgets.widgets.push(result);

        if (++widgetPositionInRow === maxPosition) {
          // console.log('End of row');
          rows.push(widgets);
          widgetPositionInRow = 0;
          widgets = newWidgets();
        }
        // console.log("*** ", JSON.stringify(widgets));
    }
    else {
      console.info(`Unable to find mapper for widget of type: ${widget.type}`);
    }
  });

  if (widgetPositionInRow !== 0) {
    rows.push(widgets);
  }
  // console.log("%%%%", JSON.stringify(rows));
  return rows;
}

function mapDashboard(dashboard, map) {
  const commonProperties = {
    refresh: 30,
    duration: {
      unit: "hour",
      value: 4
    }
  }
  const mappedProperties = objectMapper(dashboard, map.dashboardMapper());

  return Object.assign(commonProperties, mappedProperties);
}

function buildDashboard(dashboard, dashboardName, map, destFilename, datasources) {

  const dashboardMappedResult = mapDashboard(dashboard, map);
  dashboardMappedResult.rows = mapRows(dashboard, map, datasources);

  return dashboardMappedResult;
};

module.exports = (map, srcObject, destFilename, opts) => {
  const genericDashboard = loadJson(`${__dirname}/template.json`);
  const filename = `${destFilename}-dashboard-generic.json`;
  const dashboards = {};

  _.forOwn(srcObject.dashboards, (dashboard, dashboardName) => {
    dashboards[dashboardName] = buildDashboard(dashboard, dashboardName, map, destFilename, srcObject.data_sources);
  });

  genericDashboard.dashboards = dashboards;
  fs.writeJsonSync(filename, genericDashboard);
  console.log(`Creating dashboard: ${filename}`);
};
