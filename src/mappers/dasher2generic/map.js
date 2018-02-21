'use strict';

const widgetGaugeMapper = require('./widgets/gauge');
const widgetGraphMapper = require('./widgets/graph');
const widgetBarChartMapper = require('./widgets/bar-chart');

function widgetMapper() {
  return {
    GoogleGauge: widgetGaugeMapper(),
    Rickshawgraph: widgetGraphMapper(),
    GoogleColumn: widgetBarChartMapper()
  }
}

function dashboardMapper() {
  return {
    'title': 'title',
  }
}

module.exports = {
  dashboardMapper,
  widgetMapper
}
