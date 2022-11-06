# brill

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Part of speech tags from the [Brill-tagger][wiki]: 89 539 unique words or
symbols with one or more tags.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`brill`](#brill-1)
*   [Data](#data)
    *   [Capitalization](#capitalization)
    *   [Descriptions](#descriptions)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [Security](#security)
*   [License](#license)

## What is this?

This package exposes a lot of words to POS tags.

## When should I use this?

Use this when you want to do fun things with natural language.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+, 16.0+), install with [npm][]:

```sh
npm install brill
```

In Deno with [`esm.sh`][esmsh]:

```js
import {brill} from 'https://esm.sh/brill@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {brill} from 'https://esm.sh/brill@3?bundle'
</script>
```

## Use

```js
import {brill} from 'brill'

console.log(Object.keys(brill).length) // 89539

console.log(brill.Eric) //=> [ 'NNP' ]
// (Proper Noun, singular)

console.log(brill['most-contentious']) //=> [ 'RB|VBG' ]
// (Adverb; Verb, present participle/gerund)

console.log(brill.AA) //=> [ 'JJ', 'NN', 'NNP' ]
// (Adjective; Noun, singular or mass; Proper Noun, singular)
```

## API

This package exports the identifier `brill`.
There is no default export.

### `brill`

`brill` exposes a map of words to a list of tags (`Record<string, Array<string>>`).

## Data

### Capitalization

Some words are included as all-caps, first-capital, lowercase, or other:

```js
import {brill} from 'brill'

console.log(brill.THAT) // [ 'TO', 'DT' ]
console.log(brill.That) // [ 'DT', 'NNP', 'PDT', 'IN', 'RB', 'EX', 'WDT' ]
console.log(brill.that) // [ 'IN', 'DT', 'NN', 'RB', 'RP', 'UH', 'WP', 'VBP', 'WDT' ]
```

It’s recommended to check a word first in its original form first and if it does
not exist in its lowercase form.

### Descriptions

See [lib/descriptions.js][descriptions].

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
It also works in Deno and modern browsers.

## Related

*   [`buzzwords`](https://github.com/words/buzzwords)
    — list of buzzwords
*   [`fillers`](https://github.com/words/fillers)
    — list of filler words
*   [`hedges`](https://github.com/words/hedges)
    — list of hedge words
*   [`profanities`](https://github.com/words/profanities)
    — list of profane words
*   [`dale-chall`](https://github.com/words/dale-chall)
    — list of familiar American-English words
*   [`weasels`](https://github.com/words/weasels)
    — list of weasel words

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## Security

This package is safe.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/words/brill/workflows/main/badge.svg

[build]: https://github.com/words/brill/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/words/brill.svg

[coverage]: https://codecov.io/github/words/brill

[downloads-badge]: https://img.shields.io/npm/dm/brill.svg

[downloads]: https://www.npmjs.com/package/brill

[size-badge]: https://img.shields.io/bundlephobia/minzip/brill.svg

[size]: https://bundlephobia.com/result?p=brill

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/Brill_tagger

[descriptions]: lib/descriptions.js
