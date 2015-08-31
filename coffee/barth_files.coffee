request = require 'request'
cheerio = require 'cheerio'
fs = require 'fs'

# Use .env to set URLS

require('dotenv').load()

# urls to scrape

url = process.env.URL
baseUrl = process.env.BASEURL

# get the toc with request
request url, (err, response, body) ->

  # handle errors
  if err
    console.log "Couldn't get page: " + err

  # Load the page into cheerio
  $ = cheerio.load body

  # Collect links and set up array to collect only volume links
  links = $ 'a'
  volumeLinks = []

  # push volume links to volume links array
  $ links.each (i, link) ->
    if $(link).text() == 'Table of Contents'
      volumeLinks.push(baseUrl + $(link).attr 'href')

  volumeLinks = volumeLinks.slice 0, -2

  # loop over volume links
  for link in volumeLinks

    # load the volume in cheerio
    request link, (err, response, body) ->
      if err
        console.log "Couldn't get page: " + err

      $ = cheerio.load body

      paragraphLinks = $ 'a'
      viewTextLinks = []

      $ paragraphLinks.each (i, viewLink) ->
        if $(viewLink).text() == 'View Text'
          viewTextLinks.push(baseUrl + $(viewLink).attr 'href')

      # go over each paragraph, get ext, write to file
      for textLink in viewTextLinks

        request textLink, (err, response, body) ->

          # handle errors
          if err
            console.log err

          $ = cheerio.load body

          pageText = $('body').text()
          head = $('body').find '.head'
          title = head.text()
          dirname = 'paragraphs/'
          filename = dirname + title.toLowerCase().replace(/ /g, '_') + '.txt'
          fs.writeFile filename, pageText, (err, data) ->
            if err
              console.log err
            console.log data
