import {words} from './words.js'
import {tags} from './tags.js'

export var brill = unpack()

// Unpack the data.
function unpack() {
  /** @type {Object.<string, Array.<string>>} */
  var result = {}
  /** @type {string} */
  var word

  for (word in words) {
    result[word] = all(
      typeof words[word] === 'number' ? [words[word]] : words[word]
    )
  }

  return result
}

/**
 * @param {Array.<string>} tag
 */
function all(tag) {
  var index = -1
  /** @type {Array.<string>} */
  var result = []

  while (++index < tag.length) {
    result[index] = tags[tag[index]]
  }

  return result
}
