#!/usr/bin/env node

'use strict';

const program = require('commander');
const version = require('../package.json').version;
const transform = require('./commands/transform');
const publish = require('./commands/publish');

program
  .version(version);

program
  .command('transform <from_mapper> <src> <dest>')
  .description('Transforms a JSON object to another JSON object via object mapper files')
  .action(transform);

program
  .command('publish <destination> <source-filename>')
  .description('Publishes a dashboard to a destination. e.g.: "grafana"')
  .option('-k, --grafana-key [apiKey]', 'Grafana API key')
  .action(publish);

program.parse(process.argv);
