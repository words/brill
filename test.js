import assert from 'node:assert'
import test from 'node:test'
import {brill} from './index.js'

test('brill', function () {
  assert.deepEqual(
    brill.that,
    ['IN', 'DT', 'NN', 'RB', 'RP', 'UH', 'WP', 'VBP', 'WDT'],
    'should contain words'
  )
})
