# brill [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

The part-of-speech tags from the [Brill-tagger][wiki]: 89,539 unique
words/symbols with one or more [tags][descriptions].

## Installation

[npm][npm-install]:

```bash
npm install brill
```

## Usage

```js
var brill = require('brill');

Object.keys(brill).length; // 89539

brill.Eric;
// [ 'NNP' ]
// (Proper Noun, singular)

brill['most-contentious'];
// [ 'RB|VBG' ]
// (Adverb; Verb, present participle/gerund)

brill.AA;
// [ 'JJ', 'NN', 'NNP' ]
// (Adjective; Noun, singular or mass; Proper Noun, singular)
```

## API

### `brill`

**brill** exposes an object where the keys are words and the values are
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

*   [buzzwords](https://github.com/wooorm/buzzwords)
    — List of buzzwords;
*   [fillers](https://github.com/wooorm/fillers)
    — List of filler words;
*   [hedges](https://github.com/wooorm/hedges)
    — List of hedge words;
*   [profanities](https://github.com/wooorm/profanities)
    — List of profane words;
*   [dale-chall](https://github.com/wooorm/dale-chall)
    — List of familiar American-English words: New Dale-Chall (1995);
*   [weasels](https://github.com/wooorm/weasels)
    — List of weasel words.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/brill.svg

[travis]: https://travis-ci.org/wooorm/brill

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/brill.svg

[codecov]: https://codecov.io/github/wooorm/brill

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[wiki]: http://en.wikipedia.org/wiki/Brill_tagger

[descriptions]: lib/descriptions.json
