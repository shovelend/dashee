'use strict';

const _ = require('lodash');
const durationMap = require('../duration_map');

module.exports = function widgetGaugeMapper() {
  return {
    'widget.type': {
      key: 'type',
      transform: (value) => 'briangann-gauge-panel'
    },
    'widget.span': 'span',
    'widget.legend.show': 'legend.show',
    'widget.legend.position': {
      'key': 'legend.rightSide',
      transform: srcValue => srcValue === "right"
    },
    'widget.draw_options': {
      transform: (srcValue, srcObject, destObject) => {
        destObject.colors = [];
        destObject.colors.push(srcValue.colours.ok);
        destObject.colors.push(srcValue.colours.warning);
        destObject.colors.push(srcValue.colours.critical);
        destObject.gauge = destObject.gauge || {};
        destObject.gauge.tickLabelCol = srcValue.tickLabel;
        destObject.gauge.tickColMin = srcValue.minorTick;
        destObject.gauge.tickColMaj = srcValue.foreground;
        destObject.gauge.needleCol = srcValue.foreground;
        destObject.gauge.outerEdgeCol = srcValue.foreground;
        destObject.gauge.unitsLabell = srcValue.foreground;
        destObject.gauge.innerCol = srcValue.face;
      }
    },
    'widget.draw_options.showThresholds': {
      transform: (srcValue, srcObject, destObject) => {
        destObject.gauge = destObject.gauge || {};
        if (!srcValue) {
          destObject.gauge.showThresholdOnGauge = false;
          return;
        }

        destObject.gauge.showThresholdOnGauge = true;
        destObject.gauge.showLowerThresholdRange = srcValue.lower;
        destObject.gauge.showMiddleThresholdRange = srcValue.middle;
        destObject.gauge.showUpperThresholdRange = srcValue.upper;
      }
    },
    'widget.draw_options.colourOnValue': 'gauge.showThresholdColorOnValue',
    'widget.draw_options.edgeWidth': 'gauge.edgeWidth',
    'widget.draw_options.gaugeRadius': 'gauge.gaugeRadius',
    'widget.draw_options.maxValue': 'gauge.maxValue',
    'widget.draw_options.minValue': 'gauge.minValue',
    'widget.draw_options.font.tick.type': 'gauge.tickFont',
    'widget.draw_options.font.tick.size': 'gauge.labelFontSize',
    'widget.draw_options.font.value.type': 'gauge.unitsFont',
    'widget.draw_options.font.value.size': 'gauge.unitsLabelFontSize',
    'widget.draw_options.thresholds': {
      transform: (srcValue, srcObject, destObject) => {
        destObject.thresholds = _.map(srcValue, v => v.value).join(',');
      }
    },
    'widget.draw_options.animateNeedle': 'gauge.animateNeedleValueTransition',
    'widget.draw_options.animateNeedleSpeed': 'gauge.animateNeedleValueTransitionSpeed',
    'widget.datasource': 'datasource',
    'widget.metrics[].metric.key': 'targets[].target',
    'widget.metrics[].metric.id': 'targets[].refId',
    'widget.value_mappings[].operation': 'valueMaps[].op',
    'widget.value_mappings[].value': 'valueMaps[].value',
    'widget.value_mappings[].text': 'valueMaps[].text',
    "widget.duration": {
      key: 'timeFrom',
      transform: (duration) => {
        if (!duration) return null;

        return `${duration.value}${durationMap[duration.unit]}`;
      },
    },
    'widget.duration.hide': 'hideTimeOverride',
    'title': 'title',
    'transparent': 'transparent'
  }
}
