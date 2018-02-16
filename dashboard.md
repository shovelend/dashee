# Dashboard JSON format

If you need to create a dashboard from nothing, you'll need to build up a JSPON file that describes the dashboards, widgets, etc. We have a [sample JSON file](./examples/neutral.json) to get your started. This page provides more detail on the properties in the file.

## Properties

### Top level

Top level properties of the JSON file.

| Property | Description |
| --- | --- |
| `version` | The version of the JSON file. Currently this is `2` |
| `dashboards` | Holds the dashboards defined in the JSON file. Each top level property in this object is the name of a dashboard. See [dashboard](#dashboards) object definition  for more details.

Example:

```JSON
{
  "version": 2,
  "dashboards": {
    ...
  }
}
```

### Dashboard

Properties that define a dashboard

| Property | Description |
| --- | --- |
| `title` | The title of the dashboard |
| `refresh` | The time in seconds to refresh the dashboard with new data |
| `duration` | The default number of minutes, hours or days to display for the dashboard. This can be overridden at the widget level. Populates the X-axis accordingly. See the [duration](#duration) object definition for more details.
| `rows` | An array of [row](#row) objects that hold the widgets to appear in each row of the dashboard.|

Example:

Defines a dashboard named `performance` that shows 4 hours of data.

```JSON
"performance": {
      "title": "Testing Dashboard GenerationFlipper Service Performance",
      "refresh": 30,
      "duration": {
        "unit": "hour",
        "value": 4
      },
      "rows": [{
      ...
    }]
  }
```

### Row

A row holds a number of widgets that define what graphs appear in the row.

| Property | Description |
| --- | --- |
| `height` | The height of the row as a percentage. Assuming a window height of 1200, a value of 25 will produce a row height of 300 pixels.
| `widgets` | An array of [widgets](#widget) to appear in the row. |

Example:

```json
  "widgets": [{
    ...
  }]
```

### Widget

Defines the type of visualisation to display

| Property | Description |
| --- | --- |
| `type` | The type of visualisation. Must be one of `graph`, `gauge` or `stat` |
| `title` | The title of visualisation. |
| `width` | The percentage of window real estate this visualisation uses in the row. A value of 50 means use half of the row. |
| `transparent` | Set to true if you want to background of the visualisation to be transparent |
| `yaxes` | An array of y-axis information. The first item in the array is the left Y-axis, the second is the right Y-axis. Both must be specified. See [Y Axis options](#y-axis-options) for more details. |
| `draw_options` | Each visualisation has a different set of draw options. See either [Gauge draw options](#gauge-draw-options), [Graph draw options](#graph_draw_options) or [Stat draw options](#stat-draw-options) for more details. |
| `duration` | The number of minutes, hours or days to display for the visualisation. Overrides the default set at the dashboard level. See [duration](#duration) |
| `datasource` | The name of the data source used to source the metric data. For now, use `FMP Graphite` |
| `metrics` | An array of [metric](#metrics) objects that define the data needed for the visualisation |

Example:

```JSON
"widget": {
  "type": "graph",
  "height": 360,
  "span": 6,
  "yaxes": [{...}],
  "draw_options": {
  },
  "duration": {
      "unit": "minute",
      "value": 180,
      "hide": false
    },
  "datasource": "FMP Graphite",
  "metrics": [{
    "metric": {...}
    },
    ...
  }]
}
```

### Y axis options

Holds information about a graph the Y-axis.

| Property | Description |
| --- | --- |
| `label` | Label to display on the y-axis |
| `max` | Max value for the y-axis |
| `min` | Min value for the y-axis |
| `show` | If `true` shows the legend. |
| `units` | Formats the value with a prefix. E.g.: Adds a percent sign for example. See [Units](#units) for more detail. |

Example:

```JSON
"yaxes": [{
  "label": "ms",
  "max": 150,
  "min": 0,
  "show": true,
  "units": "none"
},
{
  "label": null,
  "max": null,
  "min": null,
  "show": false,
  "units": "none"
}]
```

### Graph draw options

Describes the properties needed to render the graph visualisation

| Property | Description |
| --- | --- |
| `bar` | If `true` then renders a bar graph |
| `lines` | If `true` then renders a line graph |
| `line_width` | Width of the line for line graphs |
| `staircase` | If `true` renders the line graph as a staircase |
| `points` | If `true` then renders circles on the data points of the graph |
| `points_radius` | The render size of the point in pixels|
| `fill_transparency_percentage` | When set to a number greater than zero this fills in the area underneath a line graph. 100% will fill with a solid colour |
| `thresholds` | If set should be an array that defines a threshold for the graph.|
| `threholds.value` | Value for the threshold |
| `thresholds.colour` | Colour to use for the threshold. Use either `critical`, `warning` or `ok` |
| `thresholds.fill` | If `true` fills the area above the threshold on the graph in the threshold colour |
| `thresholds.line` | If `true` drawa a line across the graph at the threshold value |
| `thresholds.operation` | Whether the threshold is above or below the threshold value. Use either `gt` or `lt` |

Example:

```JSON
"draw_options": {
  "bar": false,
  "lines": true,
  "points": true,
  "fill_transparency_percentage": 10,
  "line_width": 2,
  "points_radius": 5,
  "staircase": false,
  "thresholds": [{
    "value": 100,
    "colour": "critical",
    "fill": true,
    "line": true,
    "operation": "gt"
  }]
}
```

### Stat draw options

Describes the properties needed to render the single statistic visualisation

| Property | Description |
| --- | --- |
| `colours` | Defines the `ok`, `warning` and `critical` colours in `rgba` format. See example below. |
| `fontSize` | Percentage font size used to display the statistic |
| `prefix` | Defines the text to display before the statistic along with a percentage font size. |
| `prefix.text` | The text to display before the statistic |
| `prefix.percentage_fontsize` | The size of the font for the prefix text |
| `postfix` | Defines the text to display after the statistic along with a percentage font size. |
| `postfix.text` | The text to display after the statistic |
| `postfix.percentage_fontsize` | The size of the font for the postfix text |
| `thresholds` | An array of [threshold](#threshold) objects that hold the threshold colours and values for the stat visualisation. This allows you to change the colour of the text depending on the value in the stat, so values over a certain limit can be displayed in red for example.|

Example:

```JSON
"draw_options": {
  "colours": {
    "ok": "rgba(50, 172, 45, 0.97)",
    "warning": "rgba(237, 129, 40, 0.89)",
    "critical": "rgba(245, 54, 54, 0.9)"
  },
  "fontSize": 200,
  "prefix": {
    "text": "",
    "percentage_fontsize": 50
  },
  "postfix": {
    "text": " errors/min",
    "percentage_fontsize": 50
  },
  "thresholds": [{
      "value": 5,
      "colour": "warning"
    },
    {
      "value": 10,
      "colour": "critical"
    }
  ]
}
```

### Gauge draw options

Describes the properties needed to render the gauge  visualisation.

| Property | Description |
| --- | --- |
| `edgeWidth` | The size gauge edge as a percentage of the radius |
| `gaugeRadius` | The radius of the gauge in pixels, or 0 to auto scale. |
| `maxValue` | The maximum value of the gauge |
| `minValue` | The minimum value of the gauge |
| `font` | Font details for the gauge. See [font](#font) for more details. |
| `colours` | Defines the `ok`, `warning` `critical`, `face`, `minorTick`, `foreground` and `tickLabel` colours in `rgba` format. See example below. |
| `thresholds` | An array of [threshold](#threshold) objects that hold the threshold colours and values for the gauge visualisation. This allows you to render warning and critical areas of the guage.|
| `animateNeedle` | Set to true if you want to needle to animate between values |
| `animateNeedleSpeed` | the needle animation speed in milliseconds. |
| `showThresholds` | Controls whether the thresholds are rendered on the gauge. Has three properties, `lower`, `middle`, `upper` which take boolean values. |
| `colourOnValue` | Flag indicating if the value should be rendered depending on the threshold colour |
| `units` | Formats the value with a prefix. E.g.: Adds a percent sign for example. See [Units](#units) for more detail. |

Example:
```JSON
"draw_options": {
  "edgeWidth": 0.05,
  "gaugeRadius": 0,
  "maxValue": 100,
  "minValue": 0,
  "font": {
    "tick": {
      "type": "Open Sans",
      "size": 18
    },
    "value" : {
      "type": "Open Sans",
      "size": 22
    }
  },
  "unitsFont": "Open Sans",
  "unitsLabelFontSize": 22,
  "colours": {
    "ok": "rgba(50, 172, 45, 0.97)",
    "warning": "rgba(237, 129, 40, 0.89)",
    "critical": "rgba(245, 54, 54, 0.9)",
    "face": "rgba(255, 255, 255, 1)",
    "minorTick": "rgba(0,0,0,1)",
    "foreground": "rgba(0,153,204,1)",
    "tickLabel": "rgba(0,0,0,1)"
  },
  "thresholds": [{
      "value": 75,
      "colour": "warning"
    },
    {
      "value": 90,
      "colour": "critical"
    }
  ],
  "animateNeedle": true,
  "animateNeedleSpeed": 1500,
  "showThresholds": {
    "lower": false,
    "middle": true,
    "upper": true
  },
  "colourOnValue": true,
  "units": "percent"
}
```

### Font

Describes the font details for a gauge

| Property | Description |
| --- | --- |
| `tick` | The font details for the ticks on the gauge |
| `tick.type` | The font name. Eg: `Open Sans` |
| `tick.size` | The font size in points. E.g.: `18` |
| `value` | The font details for the value on the gauge |
| `value.type` | The font name. Eg: `Open Sans` |
| `value.size` | The font size in points. E.g.: `18` |

Example:

```JSON
"font": {
  "tick": {
    "type": "Open Sans",
    "size": 18
  },
  "value" : {
    "type": "Open Sans",
    "size": 22
  }
}
```

### Threshold

Defines threshold information

| Property | Description |
| --- | --- |
| `value` | The threshold value |
| `colour` | Description on the colour value to use, either `ok`, `warning` or `critical` |

Example:

Sets a warning threshold of 5 and a critical threshold of 10.

```JSON
"thresholds": [{
    "value": 5,
    "colour": "warning"
  },
  {
    "value": 10,
    "colour": "critical"
  }
]
```

### Metric

Describes how to get data for the visualisation. At the moment, all metrics are coming from Graphite.

| Property | Description |
| --- | --- |
| `key` | The graphite command that returns the data |
| `id` | A unique identifier for the metric. Start at `A` and increment for each metric in the list |
| `show` | If `false` the metric is not displayed on the graph |

Example:

```JSON
"metrics": [{
  "metric": {
    "key": "summarize(averageSeries(long.flipper.production.*.*.express.toggle.requestElapsedTime), '10m', 'avg', false)",
    "id": "A"
  }
}]
```

### Duration

Provides time based values for dashboards and widgets.

| Property | Description |
| --- | --- |
| `unit` | The unit of time, either `minute`, `hour` or `day` |
| `value` | The value of the unit |
| `hide` | Boolean indicating if the time override shown be shown on the visualisation (`false`) or not shown (`true`) |

Example:

This defines a duration of four hours:

```JSON
"duration": {
  "unit": "hour",
  "value": 4,
  "hide": false
}
```

### Units

A list of units prefixes which formats the text on the graph Y axes and gauges:

| Name | Description |
| --- | --- |
| none | No prefix |
| percent | Add a `%` sign |
| nanoseconds | Nanoseconds - `ns` |
| microseconds | Microseconds - `µs` |
| milliseconds | Milliseconds - `ms` |
| seconds | Seconds - `s` |
| minutes | Minutes - `m` |
| hours | Hours - `h` |
| days | Days - `d` |
| bits | Bits - `b` |
| bytes | Bytes - `B` |
| kilobytes | Kilobytes - `kB` |
| megabytes | Megabytes - `MB` |
| gigabytes | Gigebytes - `GB` |
| bitspersec | Bits per second - `bps` |
| bytespersec | Bytes per second - `Bps` |
| kilobitspersec | Kilobits per second - `kbps` |
| kilobytespersec | Kilobytes per second - `kBps` |
| megabitspersec | Megabits per second - `Mbps` |
| megabytespersec | Megabytes per second - `MBs` |
| gigabitspersec |  Gigabits per second - `Gbps` |
| gigabytespersec | Gigabytes per second - `GBs` |
