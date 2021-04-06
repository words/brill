import fs from 'fs'
import path from 'path'
import followRedirects from 'follow-redirects'
import {toJson} from 'plain-text-data-to-json'
import {bail} from 'bail'
import concat from 'concat-stream'
import {descriptions} from './lib/descriptions.js'

var url =
  'https://github.com/mark-watson/fasttag_v2/blob/master/lexicon.txt?raw=true'

var own = {}.hasOwnProperty

process.on('uncaughtException', bail)

followRedirects.https.get(url, onresponse).on('error', bail)

function onresponse(response) {
  response.resume().on('error', bail).pipe(concat(onconcat))
}

function onconcat(buf) {
  clean(toJson(String(buf), {comment: false, delimiter: ' ', forgiving: 'fix'}))
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

          if (!(subtag in descriptions)) {
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
    path.join('lib', 'words.js'),
    'export var words = ' + JSON.stringify(words, null, 2) + '\n'
  )

  fs.writeFileSync(
    path.join('lib', 'tags.js'),
    'export var tags = ' + JSON.stringify(list, null, 2) + '\n'
  )
}
