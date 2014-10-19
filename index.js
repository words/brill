'use strict';

/**
 * Dependencies.
 */

var Interface;

Interface = require('datamap-interface');

/**
 * Data.
 */

var data;

data = require('./data/brill.json');

/**
 * Expand data.
 */

var dictionary,
    has,
    index,
    words,
    word,
    tag;

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

/**
 * Expose brill.
 */

module.exports = new Interface(dictionary);
