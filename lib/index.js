import {words} from './words.js'
import {tags} from './tags.js'

const own = {}.hasOwnProperty

export const brill = unpack()

// Unpack the data.
function unpack() {
  /** @type {Object.<string, Array.<string>>} */
  const result = {}
  /** @type {string} */
  let word

  for (word in words) {
    if (own.call(words, word)) {
      result[word] = all(
        typeof words[word] === 'number' ? [words[word]] : words[word]
      )
    }
  }

  return result
}

/**
 * @param {Array.<string>} tag
 */
function all(tag) {
  let index = -1
  /** @type {Array.<string>} */
  const result = []

  while (++index < tag.length) {
    result[index] = tags[tag[index]]
  }

  return result
}
