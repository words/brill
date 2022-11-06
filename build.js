import fs from 'node:fs/promises'
import path from 'node:path'
import fetch from 'node-fetch'
import {toJson} from 'plain-text-data-to-json'
import {descriptions} from './lib/descriptions.js'

const own = {}.hasOwnProperty

const response = await fetch(
  'https://raw.githubusercontent.com/mark-watson/fasttag_v2/master/lexicon.txt'
)
const text = await response.text()

/** @type {Record<string, string>} */
const raw = toJson(text, {comment: false, delimiter: ' ', forgiving: 'fix'})

/** @type {Record<string, Array<string>>} */
const data = {}
/** @type {string} */
let key

// Generate map of words to tags.
for (key in raw) {
  if (own.call(raw, key)) {
    const lowercase = key.toLowerCase()

    // Ignore cased values of which the lowercase version has the same values.
    if (
      key !== lowercase &&
      own.call(raw, lowercase) &&
      raw[key] === raw[lowercase]
    ) {
      continue
    }

    const tags = raw[key].split(' ').map(function (tag) {
      return tag
        .split('|')
        .map(function (subtag) {
          // There's one tag, `JJSS` for the one word `best`, which I think
          // should be `JJS`
          if (subtag === 'JJSS') subtag = 'JJS'

          // There's one tag, `PRP$R` for the two words `Her` and `her`, which
          // I think should be `PRP$`.
          if (subtag === 'PRP$R') subtag = 'PRP$'

          // The data contains different tags for Proper nouns versus the normal
          // Brown corpus.
          // Sub-tags, denoted by pipes, however seem not to have changed from
          // Brown’s `NPS` to our `NNPS`.
          if (subtag === 'NPS') subtag = 'NNPS'
          if (subtag === 'NP') subtag = 'NNP'

          if (!(subtag in descriptions)) {
            console.log('Unknown tag for word `' + key + '`: ', subtag, tag)
          }

          return subtag
        })
        .join('|')
    })

    data[key] = tags
  }
}

/** @type {Record<string, number|Array<number>>} */
const words = {}
/** @type {Array<string>} */
const tags = []

// Generate map of words to tag indices.
for (key in data) {
  if (own.call(data, key)) {
    const currentTags = data[key].map((tag) => {
      const index = tags.indexOf(tag)
      return index === -1 ? tags.push(tag) : index
    })

    words[key] = currentTags.length === 1 ? currentTags[0] : currentTags
  }
}

await fs.writeFile(
  path.join('lib', 'words.js'),
  '/**\n * @type {Record<string, number|Array<number>>}\n */\nexport const words = ' +
    JSON.stringify(words, null, 2) +
    '\n'
)

await fs.writeFile(
  path.join('lib', 'tags.js'),
  '/**\n * @type {Array<string>}\n */\nexport const tags = ' +
    JSON.stringify(tags, null, 2) +
    '\n'
)
