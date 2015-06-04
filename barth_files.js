var request = require('request'),
      cheerio = require('cheerio'),
      fs = require('fs'),
      tm = require('text-miner');

// Use .env to set the URLs
require('dotenv').load();

// URLS for the site to be scraped
var url = process.env.URL;
var baseUrl = process.env.BASEURL;

// console.log("url is :" + url);
// console.log("baseurl is: " + baseUrl);


// Get the table of contents page with request
request(url, function(err, response, body) {

    // Load the page into cheerio
    $ = cheerio.load(body);

    // Collect the links and set up an empty array to collect only volume links
    var links = $('a');
    var volumeLinks = [];

    // Push volume links into the volume links array
    $(links).each(function(i, link){
        if ($(link).text() == 'Table of Contents') {
            volumeLinks.push(baseUrl + $(link).attr('href'));
        }
    });

    // Loop over the volume links array and do stuff
    for (i = 0, len = volumeLinks.length; i < len; ++i){
        // console.log(volumeLinks[i]);

        // Within each volume, we then need to get all View Text links, build an array and loop

        // Load the volume page into cheerio - this is single volume level
        request(volumeLinks[i], function(err, response, body){
            $ = cheerio.load(body);

            var paragraphLinks = $('a');
            var viewTextLinks = [];

            $(paragraphLinks).each(function(i, viewLink){
                if($(viewLink).text() == 'View Text') {
                    viewTextLinks.push(baseUrl + $(viewLink).attr('href'));
                }
            });

            for (i = 0, len = viewTextLinks.length; i < len; ++i){
                // Now we need to go over each paragraph, get the ext, and write it to a file
                request(viewTextLinks[i], function(err, response, body){
                    $ = cheerio.load(body);

                    var pageText = $('body').text();
                    var head = $('body').find('.head');
                    var title = head.text();
                    var dirname = 'paragraphs/';
                    var filename = dirname + title.toLowerCase().replace(/ /g, '_') + '.txt';
                    fs.writeFile(filename, pageText, function(err, data){
                        if (err) {
                            return console.log(err);
                        }
                        console.log(data);
                    });
                });
            }
        });
    }

});
