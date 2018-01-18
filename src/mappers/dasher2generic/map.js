'use strict';

const widgetGaugeMapper = require('./widgets/gauge');
const widgetGraphMapper = require('./widgets/graph');

function widgetMapper() {
  return {
    GoogleGauge: widgetGaugeMapper(),
    Rickshawgraph: widgetGraphMapper()
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
