
var http = require('http');
var bl = require('bl') // A Node.js Buffer list collector, reader and streamer thingy. https://www.npmjs.com/package/bl
var cheerio = require('cheerio');
var fs = require('fs');


// init the program
/* url to get | callback when complete | function to run on result */
getURL('http://www.jobs.ac.uk/search/?category=3100&sort=gl&s=1&show=200', scrapeUrlList, makeUrlList) ;


// array of all jobs
var allJobs = [];

// final data object to return
function addToAllJobs(jobDetails) {
	allJobs.push(jobDetails);
}


function pageScrape(data){
	var jobDetails = {
						'title' : null, 
						'salary': null,
						'employer': null,
						'href': null,
						'job_id': null,
						'deadline': null,
						'description': null};


	$ = cheerio.load( data.toString() );
	var $content = $('div.content');
	jobDetails.title = $content.find('h1').text();
	return jobDetails;
}


function scrapeUrlList(urlList) {
	urlList.forEach(function(value){
		getURL(value, addToAllJobs, pageScrape) ;
	})
}



function makeUrlList(data) {
  	$ = cheerio.load( data.toString() );
	var jobs = $('div.result');
	var urlList = [];
	jobs.each(function(i, elem) {
		var $this = $(this);
		urlList.push('http://www.jobs.ac.uk' + $this.find('a').attr('href') );
	});
	return urlList;
}





// starts a http get request and pipes output to a buffer
function getURL(baseurl, callback, action) {
  http.get(baseurl, function (request) {
    request.pipe(bl(function (err, data) {
      if (err)
        return console.error(data);

        callback( action(data) );
    }))
  })
}





