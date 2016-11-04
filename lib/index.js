'use strict';

/* Dependencies. */
var words = require('./words');
var tags = require('./tags');

/* Expose. */
module.exports = unpack();

/* Unpack the data. */
function unpack() {
  var result = {};
  var word;
  var tag;

  for (word in words) {
    tag = words[word];
    result[word] = typeof tag === 'number' ? [tags[tag]] : all(tag);
  }

  return result;
}

function all(tag) {
  var length = tag.length;
  var index = -1;
  var result = [];

  while (++index < length) {
    result[index] = tags[tag[index]];
  }

  return result;
}
