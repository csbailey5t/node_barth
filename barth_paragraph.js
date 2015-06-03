var request = require('request'),
      cheerio = require('cheerio'),
      fs = require('fs'),
      tm = require('text-miner');

var url = "http://solomon.dkbl.alexanderstreet.com/cgi-bin/asp/philo/dkbl/getobject.pl?c.830:1.barth";

request(url, function (error, response, body) {

    // Handle errors
    if (error) {
        console.log("Coudn't get page because of error:" + error);
    }

    // Load a page into text-miner
    var $page = cheerio.load(body);
    var text = $page('body').text();
    var corpus = new tm.Corpus([text]);

    // Clean up the corpus
    var wordArr = corpus.clean().trim().removeWords(tm.STOPWORDS.EN).removeDigits().removeInterpunctuation().documents.map(function(x){return x;});

    // Create a new corpus from the cleaned one
    var cleaned_corpus = new tm.Corpus(wordArr);

    // Create a term object
    var terms = new tm.Terms(cleaned_corpus);

    // Get an array of terms and counts when count >20
    var frequency = terms.findFreqTerms(20);

    //  Make it JSON and write a file
    var jsoned = JSON.stringify(frequency);
    fs.writeFile('output.json', jsoned);

    // Print it in terminal as well
    console.log(frequency);
});
