'use strict';

const _ = require('lodash');
const durationMap = require('../duration_map');

module.exports = function widgetStatMapper() {
  return {
    'widget.type': {
      key: 'type',
      transform: (value) => 'singlestat'
    },
    'widget.span': 'span',
    'widget.legend.show': 'legend.show',
    'widget.legend.position': {
      'key': 'legend.rightSide',
      transform: srcValue => srcValue === "right"
    },
    'widget.draw_options.colours': {
      transform: (srcValue, srcObject, destObject) => {
        destObject.colors = [];
        destObject.colors.push(srcValue.ok);
        destObject.colors.push(srcValue.warning);
        destObject.colors.push(srcValue.critical)
      }
    },
    'widget.draw_options.thresholds': {
      transform: (srcValue, srcObject, destObject) => {
        destObject.thresholds = _.map(srcValue, v => v.value).join(',');
      }
    },
    'widget.draw_options.prefix': {
      transform: (srcValue, srcObject, destObject) => {
        destObject.prefix = srcValue.text;
        destObject.prefixFontSize = `${srcValue.percentage_fontsize}%`
      }
    },
    'widget.draw_options.postfix': {
      transform: (srcValue, srcObject, destObject) => {
        destObject.postfix = srcValue.text;
        destObject.postfixFontSize = `${srcValue.percentage_fontsize}%`
      }
    },
    'widget.draw_options.fontSize': {
      'key': 'valueFontSize',
      transform: srcValue => `${srcValue}%`
    },
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
