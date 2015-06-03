// Based directly on this gist by Elliot Bonneville: https://gist.github.com/elliotbonneville/1bf694b8c83f358e0404

var request = require('request'),
      cheerio = require('cheerio');
require('dotenv').load();

var corpus = {};

var url = process.env.SINGLEPAGE;

request(url, function (error, response, body) {

    // Handle errors
    if (error) {
        console.log("Coudn't get page because of error:" + error);
    }

    // Load a page into cheerio
    var $page = cheerio.load(body);
    var text = $page('body').text();

    // Throw away whitespace and non-alphanumeric characters
    text = text.replace(/\s+/g, " ").replace(/[^a-zA-Z]/g, " ").toLowerCase();

    // Split on spaces to list all the words on the page, then loop
    text.split(" ").forEach(function (word) {

        if (corpus[word]) {
            // If the word is in the "corpus", increase the count by one
            corpus[word]++;
        } else {
            // Otherwise, set the count for the word to one
            corpus[word] = 1;
        }

    });

    var words = [];

    // Put all the words in an array
    for ( var token in corpus) {
        words.push({
            word: token,
            count: corpus[token]
        });
    }

    // Sort the array based on count
    words.sort(function (a, b) {
        return b.count - a.count;
    });

    // Log the first fifty most popular words
    console.log(words.slice(0, 20));
});

