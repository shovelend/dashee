'use strict';

/* global describe it expect */

const greet = require('../../src/modules/greet');

describe('Greeting module', () => {

  it('should greet a person with the default "Hello" greeting', () => {
    const opts = {};

    expect(greet('Tester', opts)).toBe('Hello Tester');
  });

  it('should greet a person with the greeting passed in the greeting option', () => {
    const opts = {
      greeting: 'Bonjour'
    };

    expect(greet('Tester', opts)).toBe('Bonjour Tester');
  });

  it('should SHOUT out the name of the person being greeted', () => {
    const opts = {
      shout: true
    };

    expect(greet('Tester', opts)).toBe('Hello TESTER');
  });

  it('should SHOUT out the name of the person being greeted and change the greeting', () => {
    const opts = {
      shout: true,
      greeting: 'Bonjour'
    };

    expect(greet('Tester', opts)).toBe('Bonjour TESTER');
  });
});
