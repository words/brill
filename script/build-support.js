'use strict';

var fs,
    brill,
    tags,
    examples;

fs = require('fs');
brill = require('../');
tags = require('../data/tags');

examples = {};

Object.keys(brill.all()).forEach(function (word) {
    brill.get(word).forEach(function (tag) {
        if (!examples[tag]) {
            examples[tag] = [];
        }

        examples[tag].push(word);
    });
});

fs.writeFileSync('Supported-tags.md',
    'Supported Tags\n' +
    '=================\n' +
    '\n' +
    'Additionally to this list, there are also combinations returned, ' +
    'such as `NNP|VBN` for `England-born`.\n' +
    '\n' +
    '| tag | description | examples |\n' +
    '| :-: | :---------- | :------- |\n' +

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

        return '| ' +
            [
                tag[0],
                tag[1],
                example
            ].join(' | ').replace(/[`_*]/g, '\\$&') +
            ' |';
    }).join('\n') +

    '.\n'
);
