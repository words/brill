import {words} from './words.js'
import {tags} from './tags.js'

export var brill = unpack()

// Unpack the data.
function unpack() {
  var result = {}
  var word
  var tag

  for (word in words) {
    tag = words[word]
    result[word] = typeof tag === 'number' ? [tags[tag]] : all(tag)
  }

  return result
}

function all(tag) {
  var index = -1
  var result = []

  while (++index < tag.length) {
    result[index] = tags[tag[index]]
  }

  return result
}
