'use strict';

const mapper = {
  percent: 'percent',
  nanoseconds: 'ns',
  microseconds: 'µs',
  milliseconds: 'ms',
  seconds: 's',
  minutes: 'm',
  hours: 'h',
  days: 'd',
  bits: 'decbits',
  bytes: 'decbytes',
  kilobytes: 'deckbytes',
  megabytes: 'decmbytes',
  gigabytes: 'decgbytes'
}

module.exports = unit => mapper[unit] || unit;
