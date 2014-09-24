'use strict';

var data,
    Interface,
    dictionary,
    index,
    words,
    word,
    has,
    tag;

Interface = require('datamap-interface');
data = require('./data/brill.json');

dictionary = {};

has = Object.prototype.hasOwnProperty;

for (tag in data) {
    words = data[tag];
    index = words.length;

    while (index--) {
        word = words[index];

        if (has.call(dictionary, word)) {
            dictionary[word].push(tag);
        } else {
            dictionary[word] = [tag];
        }
    }
}

module.exports = new Interface(dictionary);
