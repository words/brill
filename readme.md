# brill

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

The part-of-speech tags from the [Brill-tagger][wiki]: 89,539 unique
words/symbols with one or more [tags][descriptions].

## Installation

[npm][]:

```bash
npm install brill
```

## Usage

```js
var brill = require('brill')

console.log(Object.keys(brill).length) // 89539

console.log(brill.Eric) //=> [ 'NNP' ]
// (Proper Noun, singular)

console.log(brill['most-contentious']) //=> [ 'RB|VBG' ]
// (Adverb; Verb, present participle/gerund)

console.log(brill.AA) //=> [ 'JJ', 'NN', 'NNP' ]
// (Adjective; Noun, singular or mass; Proper Noun, singular)
```

## API

### `brill`

`brill` exposes an object where the keys are words and the values are
a list of tags / joined tags (`Object.<string>`).

## Capitalisation

Some words are included as all-caps, first-capital, lowercase, or other:

```js
var brill = require('brill')

console.log(brill.THAT) // [ 'TO', 'DT' ]
console.log(brill.That) // [ 'DT', 'NNP', 'PDT', 'IN', 'RB', 'EX', 'WDT' ]
console.log(brill.that) // [ 'IN', 'DT', 'NN', 'RB', 'RP', 'UH', 'WP', 'VBP', 'WDT' ]
```

It’s recommended to check a given word first in its original form,
and second, if no tags are found, in its lowercase form.

## Related

*   [`buzzwords`](https://github.com/words/buzzwords)
    — List of buzzwords
*   [`fillers`](https://github.com/words/fillers)
    — List of filler words
*   [`hedges`](https://github.com/words/hedges)
    — List of hedge words
*   [`profanities`](https://github.com/words/profanities)
    — List of profane words
*   [`dale-chall`](https://github.com/words/dale-chall)
    — List of familiar American-English words
*   [`weasels`](https://github.com/words/weasels)
    — List of weasel words

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/words/brill.svg

[build]: https://travis-ci.org/words/brill

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/brill.svg

[coverage]: https://codecov.io/github/wooorm/brill

[downloads-badge]: https://img.shields.io/npm/dm/brill.svg

[downloads]: https://www.npmjs.com/package/brill

[size-badge]: https://img.shields.io/bundlephobia/minzip/brill.svg

[size]: https://bundlephobia.com/result?p=brill

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/Brill_tagger

[descriptions]: lib/descriptions.json
