var request = require('request'),
      cheerio = require('cheerio');

var corpus = {},
      totalResults = 0,
      resultsDownloaded = 0;

function logwords () {
    resultsDownloaded++;

    if (resultsDownloaded !== totalResults) {
        return;
    }

    var words = [];

    // put all words into an array
    for (prop in corpus) {
        words.push({
            word: prop,
            count: corpus[prop]
        });
    }

    // sort array based on count
    words.sort(function (a, b) {
        return b.count - a.count
    });

    //log the fifty most popular words
    console.log(words.slice(0, 20));
}

