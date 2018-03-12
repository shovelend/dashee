'use strict';

const _ = require('lodash');

const durationLookup = require('../duration_map');
const metricsParser = require('../metrics-parser');

function getThresholdValue(expr, value) {
  const match = expr.exec(value);

  if (match) {
    return match[1];
  }

  return 0;
}

module.exports = function widgetGaugeMapper() {
  return {
    'type': {
      key: 'widget.type',
      transform: value => 'gauge'
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
    'properties': {
      transform: (srcValue, srcObject, destObject) => {
        if (!srcValue) return;

        destObject.widget.draw_options = {
          edgeWidth: 0.05,
          gaugeRadius: 0,
          maxValue: 100,
          minValue: 0,
          font: {
            tick: {
              type: "Open Sans",
              size: 18
            },
            value : {
              type: "Open Sans",
              size: 22
            }
          },
          unitsFont: "Open Sans",
          unitsLabelFontSize: 22,
          colours: {
            ok: "rgba(50, 172, 45, 0.97)",
            warning: "rgba(237, 129, 40, 0.89)",
            critical: "rgba(245, 54, 54, 0.9)",
            face: "rgba(255, 255, 255, 1)",
            minorTick: "rgba(0,0,0,1)",
            foreground: "rgba(0,153,204,1)",
            tickLabel: "rgba(0,0,0,1)"
          },
          animateNeedle: true,
          animateNeedleSpeed: 1500,
          showThresholds: {
            lower: false,
            middle: true,
            upper: true
          },
          colourOnValue: true
        };
        destObject.widget.draw_options.thresholds = [{
          "value": getThresholdValue(/data-yellow_from="(\d+)"/g, srcValue),
          "colour": "warning"
        },
        {
          "value": getThresholdValue(/data-red_from="(\d+)"/g, srcValue),
          "colour": "critical"
        }];
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

          if (!datasource) {
            throw new Error(`Unable to find datasource named "${metric.source}". This probably indicates a problems with your Dasher YML file`);
          }

          const key = metricsParser(datasource.functions, datasource.key);
          destObject.widget.metrics.push({
            metric: {
              key,
              id: String.fromCharCode(charCode++)
            }
          });
        })
      }
    }
  };
}
