import { formatCurrency } from '../../scripts/utils/money.js'


/*
  there are generally two types of test cases:
  1. Basic test cases: tests if the code is working or not
  2. Edge cases: test with values that are tricky

  automated tests make it easy to retest our code after we make any changes
  naming tests; describe what the code is doing
  
  Test suite: we group related tests together
*/

console.log('test suite: format currency');

console.log('converts cents into dollars');
// test case1
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');
// edge case1: format 0
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');
// edge case2: rounding up
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds down to the nearest cent');
// edge case3: rounding down
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
}