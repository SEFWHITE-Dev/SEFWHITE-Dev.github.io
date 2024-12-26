import { formatCurrency } from '../../scripts/utils/money.js'

// describe(): Jasmine function to create a group of specs (test suite)
describe('test suite: format currency', () => {
  // it(): Jasmine function to define a single spec/test
  it('converts cents into dollars', () => {
    // expect(): Jasmine function that lets us compare a value to another value
    // to compare the value, expect() gives us an object with many methods to do comparisons
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

});
