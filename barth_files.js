var request = require('request'),
      cheerio = require('cheerio'),
      fs = require('fs'),
      tm = require('text-miner');

var url = "http://solomon.dkbl.alexanderstreet.com/cgi-bin/asp/philo/dkbl/volumes_toc.pl?&church=ON";

request(url, function (error, response, body){

    // Handle errors
    if (error) {
        console.log("Couldn't get page because of error:" + error);
    }

});


