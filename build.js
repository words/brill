'use strict'

var fs = require('fs')
var path = require('path')
var https = require('follow-redirects').https
var toJSON = require('plain-text-data-to-json')
var bail = require('bail')
var concat = require('concat-stream')
var tags = require('./lib/descriptions')

var url =
  'https://github.com/mark-watson/fasttag_v2/blob/master/lexicon.txt?raw=true'

var own = {}.hasOwnProperty

process.on('uncaughtException', bail)

https.get(url, onresponse).on('error', bail)

function onresponse(response) {
  response.resume().on('error', bail).pipe(concat(onconcat))
}

function onconcat(buf) {
  clean(toJSON(String(buf), {comment: false, delimiter: ' ', forgiving: 'fix'}))
}

function clean(data) {
  // Remove values of which the capitalised version has the same value as the
  // lower case version.
  for (const word of Object.keys(data)) {
    var caseless = word.toLowerCase()

    if (word === caseless || !own.call(data, caseless)) {
      continue
    }

    if (data[word] === data[caseless]) {
      delete data[word]
    }
  }

  for (const word of Object.keys(data)) {
    data[word] = data[word].split(' ').map(function (tag) {
      return tag
        .split('|')
        .map(function (subtag) {
          // There's one tag, `JJSS` for the one word `best`, which I think
          // should be `JJS`
          if (subtag === 'JJSS') {
            subtag = 'JJS'
          }

          // There's one tag, `PRP$R` for the two words `Her` and `her`, which
          // I think should be `PRP$`.
          if (subtag === 'PRP$R') {
            subtag = 'PRP$'
          }

          // The data contains different tags for Proper nouns versus the normal
          // Brown corpus.
          // Sub-tags, denoted by pipes, however seem not to have changed from
          // Brown’s `NPS` to our `NNPS`.
          if (subtag === 'NPS') {
            subtag = 'NNPS'
          }

          if (subtag === 'NP') {
            subtag = 'NNP'
          }

          if (!(subtag in tags)) {
            console.log('Unknown tag for word `' + word + '`: ', subtag, tag)
          }

          return subtag
        })
        .join('|')
    })
  }

  generate(data)
}

function generate(data) {
  var words = {}
  var list = []

  for (const word of Object.keys(data)) {
    var currentTags = data[word].map(function (tag) {
      var pos = list.indexOf(tag)
      return pos === -1 ? list.push(tag) : pos
    })

    words[word] = currentTags.length === 1 ? currentTags[0] : currentTags
  }

  fs.writeFileSync(
    path.join(__dirname, 'lib', 'words.json'),
    JSON.stringify(words, null, 2) + '\n'
  )

  fs.writeFileSync(
    path.join(__dirname, 'lib', 'tags.json'),
    JSON.stringify(list, null, 2) + '\n'
  )
}
