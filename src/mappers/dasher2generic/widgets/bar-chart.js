'use strict';

const _ = require('lodash');
const durationLookup = require('../duration_map');
const metricsParser = require('../metrics-parser');

module.exports = function widgetBarChartMapper() {
  return {
    'type': {
      key: 'widget.type',
      transform: value => 'graph'
    },
    'title': 'title',
    'width': {
      'key': 'widget.width',
      transform: value  => (value / 4) * 100
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

        destObject.widget.draw_options = {
          bar: true,
          lines: false,
          points: false,
          fill_transparency_percentage: 10,
          line_width: 1,
          points_radius: 0,
          staircase: false
        }
      }
    }
  }
}
