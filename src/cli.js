#!/usr/bin/env node

'use strict';

const program = require('commander');
const version = require('../package.json').version;
const transform = require('./commands/transform');
const publish = require('./commands/publish');
const publishAll = require('./commands/publish-all');

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

  program
    .command('publish-all <destination> <service-name> <directory-path>')
    .description('Publishes all dashboards for that service to a destination. e.g.: "grafana"')
    .option('-k, --grafana-key [apiKey]', 'Grafana API key')
    .action(publishAll);

program.parse(process.argv);
