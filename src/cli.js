#!/usr/bin/env node

'use strict';

const program = require('commander');
const version = require('../package.json').version;
const transform = require('./commands/transform');

program
  .version(version);

program
  .command('transform <from_mapper> <src> <dest>')
  .description('Transforms a JSON object to another JSON object via object mapper files')
  .action(transform);

program.parse(process.argv);
