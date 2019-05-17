# brill [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

The part-of-speech tags from the [Brill-tagger][wiki]: 89,539 unique
words/symbols with one or more [tags][descriptions].

## Installation

[npm][]:

```bash
npm install brill
```

## Usage

```js
var brill = require('brill');

Object.keys(brill).length; // 89539

brill.Eric; //=> [ 'NNP' ]
// (Proper Noun, singular)

brill['most-contentious']; //=> [ 'RB|VBG' ]
// (Adverb; Verb, present participle/gerund)

brill.AA; //=> [ 'JJ', 'NN', 'NNP' ]
// (Adjective; Noun, singular or mass; Proper Noun, singular)
```

## API

### `brill`

`brill` exposes an object where the keys are words and the values are
a list of tags / joined tags (`Object.<string>`).

## Capitalisation

Some words are included as all-caps, first-capital, lowercase, or other:

```js
brill.THAT; // [ 'WDT', 'DT' ]
brill.That; // [ 'DT', 'NNP', 'PDT', 'IN', 'RB', 'WP', 'WDT' ]
brill.that; // [ 'IN', 'DT', 'NN', 'RB', 'RP', 'UH', 'WP', 'VBP', 'WDT' ]
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

[travis-badge]: https://img.shields.io/travis/words/brill.svg

[travis]: https://travis-ci.org/words/brill

[codecov-badge]: https://img.shields.io/codecov/c/github/words/brill.svg

[codecov]: https://codecov.io/github/words/brill

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: http://wooorm.com

[wiki]: http://en.wikipedia.org/wiki/Brill_tagger

[descriptions]: lib/descriptions.json
