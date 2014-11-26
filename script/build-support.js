'use strict';

/**
 * Dependencies.
 */

var fs,
    table,
    brill,
    tags;

fs = require('fs');
table = require('markdown-table');
brill = require('..');
tags = require('../data/tags');

/**
 * Examples.
 */

var examples;

examples = {};

Object.keys(brill.all()).forEach(function (word) {
    brill.get(word).forEach(function (tag) {
        if (!examples[tag]) {
            examples[tag] = [];
        }

        examples[tag].push(word);
    });
});

/**
 * Data.
 */

var data;

function clean(value) {
    return value.replace(/[`_*]/g, '\\$&');
}

data = [
    ['Tag', 'Description', 'Examples']
].concat(
    Object.keys(tags).map(function (tag) {
        return [tag, tags[tag]];
    }).sort(function (a, b) {
        return a[0].charCodeAt(0) - b[0].charCodeAt(0);
    }).map(function (tag) {
        var example;

        example = '“' + examples[tag[0]].slice(0, 5).join('”, “') + '”';

        if (examples[tag[0]][6]) {
            example += '…';
        }

        return [tag[0], tag[1], example].map(clean);
    })
);

/**
 * Write
 */

fs.writeFileSync('Support.md',
    'Supported Tags\n' +
    '=================\n' +
    '\n' +
    'Additionally to this list, there are also combinations returned, ' +
    'such as `NNP|VBN` for `England-born`.\n' +
    '\n' +

    table(data, {
        'align': ['c']
    }) +

    '\n'
);
