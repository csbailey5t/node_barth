var request = require('request'),
      cheerio = require('cheerio'),
      fs = require('fs'),
      tm = require('text-miner');
require('dotenv').load();


var url = process.env.URL;
var baseUrl = process.env.BASEURL;

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




