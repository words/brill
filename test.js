'use strict'

var test = require('tape')
var brill = require('.')

test('brill', function(t) {
  t.deepEqual(
    brill.that,
    ['IN', 'DT', 'NN', 'RB', 'RP', 'UH', 'WP', 'VBP', 'WDT'],
    'should contain words'
  )

  t.end()
})
