'use strict';

const durationMap = require('../duration_map');

module.exports = function widgetGraphMapper() {
  return {
    'widget.type': {
      key: 'type',
      transform: (value) => 'graph'
    },
    'widget.span': 'span',
    'widget.draw_options.bar': 'bars',
    'widget.draw_options.lines': 'lines',
    'widget.draw_options.points': 'points',
    'widget.draw_options.fill_transparency_percentage': {
      key: 'fill',
      transform: (value) => parseInt(value) / 10
    },
    'widget.draw_options.line_width': 'linewidth',
    'widget.draw_options.points_radius': 'pointradius',
    'widget.draw_options.staircase': 'steppedLine',
    'widget.draw_options.thresholds[].value': 'thresholds[].value',
    'widget.draw_options.thresholds[].fill': 'thresholds[].fill',
    'widget.draw_options.thresholds[].line': 'thresholds[].line',
    'widget.draw_options.thresholds[].operation': 'thresholds[].op',
    'widget.draw_options.thresholds[].colour': 'thresholds[].colorMode',
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
      }
    },
    'widget.duration.hide': 'hideTimeOverride',
    'title': 'title',
    'transparent': 'transparent'
  }
}
