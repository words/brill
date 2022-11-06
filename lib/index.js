import {words} from './words.js'
import {tags} from './tags.js'

const own = {}.hasOwnProperty

export {descriptions} from './descriptions.js'
export const brill = unpack()

// Unpack the data.
function unpack() {
  /** @type {Record<string, Array<string>>} */
  const result = {}
  /** @type {string} */
  let word

  for (word in words) {
    if (own.call(words, word)) {
      const value = words[word]
      const list = typeof value === 'number' ? [value] : value
      result[word] = all(list)
    }
  }

  return result
}

/**
 * @param {Array<number>} tag
 */
function all(tag) {
  let index = -1
  /** @type {Array<string>} */
  const result = []

  while (++index < tag.length) {
    result[index] = tags[tag[index]]
  }

  return result
}
