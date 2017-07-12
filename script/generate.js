'use strict';

/* eslint-disable babel/new-cap */

var fs = require('fs');
var path = require('path');
var https = require('follow-redirects').https;
var toJSON = require('plain-text-data-to-json');
var has = require('has');
var bail = require('bail');
var concat = require('concat-stream');
var tags = require('../lib/descriptions');

var url = 'https://github.com/mark-watson/fasttag_v2/blob/master/lexicon.txt?raw=true';

process.on('uncaughtException', bail);

https
  .get(url, function (res) {
    res.resume()
      .on('error', bail)
      .pipe(concat(parse));
  })
  .on('error', bail);

function parse(data) {
  clean(toJSON(data.toString('utf8'), {
    comment: false,
    delimiter: ' ',
    forgiving: 'fix'
  }));
}

function clean(data) {
  /* Remove values of which the capitalised version
   * has the same value as the lower case version. */
  Object.keys(data).forEach(function (word) {
    var caseless = word.toLowerCase();

    if (word === caseless || !has(data, caseless)) {
      return;
    }

    if (data[word] === data[caseless]) {
      delete data[word];
    }
  });

  Object.keys(data).forEach(function (word) {
    data[word] = data[word].split(' ').map(function (tag) {
      return tag.split('|').map(function (subtag) {
        /* There's one tag, `JJSS` for the one word `best`,
         * which I think should be `JJS` */
        if (subtag === 'JJSS') {
          subtag = 'JJS';
        }

        /* There's one tag, `PRP$R` for the two words
         * `Her` and `her`, which I think should be `PRP$`. */
        if (subtag === 'PRP$R') {
          subtag = 'PRP$';
        }

        /* The data contains different tags for Proper
         * nouns versus the normal Brown corpus.
         * Sub-tags, denoted by pipes, however seem not
         * to have changed from Brown's `NPS` to our
         * `NNPS`. */
        if (subtag === 'NPS') {
          subtag = 'NNPS';
        }

        if (subtag === 'NP') {
          subtag = 'NNP';
        }

        if (!(subtag in tags)) {
          console.log(
            'Unknown tag for word `' + word + '`: ', subtag, tag
          );
        }

        return subtag;
      }).join('|');
    });
  });

  generate(data);
}

function generate(data) {
  var words = {};
  var list = [];

  Object.keys(data).forEach(function (word) {
    var currentTags = data[word].map(function (tag) {
      var pos = list.indexOf(tag);
      return pos === -1 ? list.push(tag) : pos;
    });

    words[word] = currentTags.length === 1 ? currentTags[0] : currentTags;
  });

  fs.writeFileSync(
    path.join(__dirname, '..', 'lib', 'words.json'),
    JSON.stringify(words, null, 2) + '\n'
  );

  fs.writeFileSync(
    path.join(__dirname, '..', 'lib', 'tags.json'),
    JSON.stringify(list, null, 2) + '\n'
  );
}
