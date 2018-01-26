'use strict';

const _ = require('lodash');
const durationLookup = require('../duration_map');
const metricsParser = require('../metrics-parser');

function getIsBarChart(value) {
  const expr = /data-renderer="(\w+)"/g;
  const match = expr.exec(value);

  if (!match) return false;

  return match[0].toLowerCase() === 'bar';
}

module.exports = function widgetGaugeMapper() {
  return {
    'type': {
      key: 'widget.type',
      transform: value => 'graph'
    },
    'title': 'title',
    'width': {
      'key': 'widget.width',
      transform: value  => (4 / value) * 100
    },
    'from_duration': {
      'key': 'widget.duration',
      transform: value => {
        if (!value) return;

        const expr = /^-(\d+)(.*)$/;
        const match = expr.exec(value);

        return {
          unit: durationLookup[match[2]],
          value: match[1],
          hide: true
        }
      }
    },
    measures: {
      transform: (srcValue, srcObject, destObject) => {
        if (!srcValue) return;

        destObject.widget.datasource = "FMP Graphite";
        destObject.widget.metrics = [];


        let charCode = 65;
        _.forOwn(srcValue, metric => {
          const datasource = srcObject.datasources[metric.source];
          const key = metricsParser(datasource.functions, datasource.key);
          destObject.widget.metrics.push({
            metric: {
              key,
              id: String.fromCharCode(charCode++)
            }
          });
        })
      }
    },
    'properties': {
      transform: (srcValue, srcObject, destObject) => {
        if (!srcValue) return;

        const isBarChart = getIsBarChart(srcValue);
        destObject.widget.draw_options = {
          bar: isBarChart,
          lines: !isBarChart,
          points: false,
          fill_transparency_percentage: 10,
          line_width: 1,
          points_radius: isBarChart ? 0 : 3,
          staircase: false
        }
      }
    }
  }
}
