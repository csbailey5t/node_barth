var request = require('request'),
      cheerio = require('cheerio'),
      fs = require('fs'),
      tm = require('text-miner');

var url = "http://solomon.dkbl.alexanderstreet.com/cgi-bin/asp/philo/dkbl/volumes_toc.pl?&church=ON";
var baseUrl = "http://solomon.dkbl.alexanderstreet.com";

request(url, function(err, response, body) {

    $ = cheerio.load(body);

    var links = $('a');
    var volumeLinks = [];

    $(links).each(function(i, link){
        // console.log($(link).text() + ':\n ' + $(link).attr('href'));
        if ($(link).text() == 'Table of Contents') {
            volumeLinks.push(baseUrl + $(link).attr('href'));
        }
    });

    console.log(volumeLinks);
});




