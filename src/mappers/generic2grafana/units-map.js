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
  gigabytes: 'decgbytes',
  bitspersec: 'bps',
  bytespersec: 'Bps',
  kilobitspersec: 'Kbits',
  kilobytespersec: 'KBs',
  megabitspersec: 'Mbits',
  megabytespersec: 'MBs',
  gigabitspersec: 'Gbits',
  gigabytespersec: 'GBs'
}

module.exports = unit => mapper[unit] || unit;
