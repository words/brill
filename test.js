import test from 'tape'
import {brill} from './index.js'

test('brill', function (t) {
  t.deepEqual(
    brill.that,
    ['IN', 'DT', 'NN', 'RB', 'RP', 'UH', 'WP', 'VBP', 'WDT'],
    'should contain words'
  )

  t.end()
})
