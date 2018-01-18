'use strict';

const widgetGraphMapper = require('./widgets/graph');
const widgetStatMapper = require('./widgets/single-stat');
const widgetGaugeMapper = require('./widgets/gauge');
const durationMap = require('./duration_map');

function widgetMapper() {
  return {
    graph: widgetGraphMapper(),
    stat: widgetStatMapper(),
    gauge: widgetGaugeMapper(),
  }
}

function dashboardMapper() {
  return {
    'title': 'title',
    'refresh': {
      key: 'refresh',
      transform: (value) => `${value}s`
    },
    'duration': {
      key: "time",
      transform: (duration) => {
        if (!duration) return null;

        const from = `now-${duration.value}${durationMap[duration.unit]}`;
        const to = 'now';
        return { from, to };
      }
    }
  }
}
module.exports = {
  widgetMapper,
  dashboardMapper
}
