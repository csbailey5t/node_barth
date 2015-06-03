var request = require('request'),
      cheerio = require('cheerio'),
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

    console.log(text);

});

