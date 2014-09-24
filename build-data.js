'use strict';

var fs,
    textToJSON,
    data,
    tags,
    dictionary;

fs = require('fs');
textToJSON = require('plain-text-data-to-json');
tags = require('./tags');

data = textToJSON(fs.readFileSync('data/brill.txt', 'utf8'), {
    'comment' : false,
    'delimiter' : ' ',
    'forgiving' : 'fix'
});

Object.keys(data).forEach(function (word) {
    if (word === word.toLowerCase() || !data[word.toLowerCase()]) {
        return;
    }

    /**
     * Remove values of which the capitalised version has the same value
     * as the lower case version.
     */

    if (data[word] === data[word.toLowerCase()]) {
        delete data[word];
        return;
    }
});

Object.keys(data).forEach(function (word) {
    data[word] = data[word].split(' ').map(function (tag) {
        return tag.split('|').map(function (subtag) {
            /**
             * There's one tag, `JJSS` for the one word `best`, which I
             * think should be `JJS`
             */

            if (subtag === 'JJSS') {
                subtag = 'JJS';
            }

            /**
             * There's one tag, `PRP$R` for the two words `Her` and `her`,
             * which I think should be `PRP$`.
             */

            if (subtag === 'PRP$R') {
                subtag = 'PRP$';
            }

            /**
             * The data contains different tags for Proper nouns versus
             * the normal Brown corpus. Sub-tags, denoted by pipes, however
             * seem not to have changed from Brown's `NPS` to our `NNPS`.
             */

            if (subtag === 'NPS') {
                subtag = 'NNPS';
            }

            if (subtag === 'NP') {
                subtag = 'NNP';
            }

            if (!tags.has(subtag)) {
                console.log(
                    'Unknown tag for word `' + word + '`: ', subtag, tag
                );
            }

            return subtag;
        }).join('|');
    });
});

dictionary = {};

Object.keys(data).forEach(function (word) {
    data[word].forEach(function (tag) {
        if (!(tag in dictionary)) {
            dictionary[tag] = [word];
        } else {
            dictionary[tag].push(word);
        }
    });
});

fs.writeFileSync('data/brill.json', JSON.stringify(dictionary, 0, 2));
