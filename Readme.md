# brill [![Build Status](https://travis-ci.org/wooorm/brill.svg?branch=master)](https://travis-ci.org/wooorm/brill) [![Coverage Status](https://img.shields.io/coveralls/wooorm/brill.svg)](https://coveralls.io/r/wooorm/brill?branch=master)

The part-of-speech tags from the [Brill-tagger](http://en.wikipedia.org/wiki/Brill_tagger): 89,539 unique words/symbols with one or more [tags](Supported-tags.md).

## Installation

npm:
```sh
$ npm install brill
```

Component:
```sh
$ component install wooorm/brill
```

Bower:
```sh
$ bower install brill
```

## Usage

```js
var brill = require('brill');

brill.get('Eric'); // ['NNP']

brill.has('unicorn'); // false
brill.add('unicorn', ['NN']);
brill.get('unicorn'); // ['NN']

brill.remove('unicorn');
brill.get('unicorn'); // null

brill.get('most-contentious'); // ['RBS|JJ']
```

## Capitalisation

Some words are included as all-caps, first-capital, lowercase, or other:

```js
> brill.get('THAT')
[ 'WDT', 'DT' ]
> brill.get('That')
[ 'DT', 'NNP', 'PDT', 'IN', 'RB', 'WP', 'WDT' ]
> brill.get('that')
[ 'IN', 'DT', 'NN', 'RB', 'RP', 'UH', 'WP', 'VBP', 'WDT' ]
```

It is recommended to check a given word first in its original form, and second, if no tags are found, in its lowercase form.

## API

See [the **datamap-interface** API](https://github.com/wooorm/datamap-interface).

## Tags

See [Supported-tags.md](Supported-tags.md).

## License

MIT © Titus Wormer
