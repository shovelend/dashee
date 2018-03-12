'use strict';

const fs = require('fs-extra');
const sut = require('../src/mappers/generic2grafana/mapper');

describe('Transform generic format to Grafana', () => {
  const serviceName = 'tester';
  const baseDir = __dirname.replace(/test/g, '');

  beforeAll(() => {
    const srcFilename = `${baseDir}/examples/neutral.json`;
    sut(srcFilename, serviceName, {});
  });

  afterAll(() => {
    fs.removeSync(`${baseDir}/${serviceName}-performance.json`);
  });

  test('transforms creates the dashboard JSON file', () => {
    const fileExists = fs.pathExistsSync(`./${serviceName}-performance.json`);

    expect(fileExists).toBe(true);
  });

  test('transforms the generic file correctly', () => {
    const actual = fs.readJsonSync(`./${serviceName}-performance.json`);
    const expected = fs.readJsonSync(`${__dirname}/expected-output/tester-performance.json`);

    expect(actual).toEqual(expected);
  });
});
