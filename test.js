/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module brill
 * @fileoverview Test suite for `brill`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var brill = require('./');

/* Tests. */
test('brill', function (t) {
  t.deepEqual(
    brill.that,
    ['IN', 'DT', 'NN', 'RB', 'RP', 'UH', 'WP', 'VBP', 'WDT'],
    'should contain words'
  );

  t.end();
});
