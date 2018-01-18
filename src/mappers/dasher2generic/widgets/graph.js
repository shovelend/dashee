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
      'key': 'widget.span',
      transform: value  => value * 3
    },
    'height': {
      'key': 'widget.height',
      transform: value => value * 360
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


        _.forOwn(srcValue, metric => {
          let charCode = 65;
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
          points: !isBarChart,
          fill_transparency_percentage: 10,
          line_width: 2,
          points_radius: isBarChart ? 0 : 5,
          staircase: false
        }
      }
    }
  }
}
