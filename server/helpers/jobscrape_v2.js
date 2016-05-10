/*
  scrapes supplied urls for jobs, parses HTML, writes essential data(title, salary , position) to JSON file.
*/
var http = require('http')
var bl = require('bl') // A Node.js Buffer list collector, reader and streamer thingy. https://www.npmjs.com/package/bl
var cheerio = require('cheerio');
var fs = require('fs');
var moment = require('moment'); // momentjs library
moment().format();


// all IT jobs on jobs.ac.uk
var JobSites = [
  {"url" : "http://www.jobs.ac.uk/search/?category=3100&sort=gl&s=1&show=200",
  "title" : "jobs.ac.uk",
  "baseUrl" : "http://www.jobs.ac.uk"
  }
]


module.exports = {
  get: function (success) {
    JobSites.forEach(function(site) {
      http.get(site.url, function (request) {
        request.pipe(bl(function (err, data) {
          if (err)
            return console.error(data);

            success( makeUrlList(data, site) );
        }))
      })
    });
  }
};


initCrawl('http://www.jobs.ac.uk/search/?category=3100&sort=gl&s=1&show=200');

function initCrawl(baseurl) {
  http.get(baseurl, function (request) {
    request.pipe(bl(function (err, data) {
      if (err)
        return console.error(data);

        success( makeUrlList(data) );
    }))
  })
}


function makeUrlList(data) {
  $ = cheerio.load( data.toString() );
  var jobs = $('div.result');
  var urlList = [];
  jobs.each(function(i, elem) {
    var $this = $(this);
    var url = $this.find('a').attr('href');
    urlList.push(url);
  });
  console.log(urlList);
}






function jobScrape(data, site) {
  // var jobBlob =  { "title": site.title, "lastupdated": new Date(), "jobs": [] };


  $ = cheerio.load( data.toString() );
  var jobs = $('div.result');

  jobs.each(function(i, elem) {

    // var jobObject = {'title' : null, 'salary': null, 'employer': null ,'href': null, 'job_id': null, 'deadline': null };

    var $this = $(this);

    //job id
    var url = $this.find('a').attr('href');




    var urlparts = url.split('/');
    jobObject.job_id = urlparts[2];
    // job url
    jobObject.href = site.baseUrl + url;
    // job title
    jobObject.title = $this.find('a').text().trim();
    //employer
    jobObject.employer = $this.find('div.employer').text().trim();
    //salary
    var info = $this.find('div.info').text();
    var pos = info.indexOf("£");
    var salary = info.substr(pos, 22).trim();
    jobObject.salary  = salary;
    // deadline
    var month = $this.find('span.month').text();
    var day = $this.find('span.day').text();
    // function to translate string to date object in mongoDB
    jobObject.deadline = stringToDate(day,month);

    jobBlob.jobs.push(jobObject);
  });

  return jobBlob
}


// add to mongodb as date object
function stringToDate(day,month) {
  var year = moment().year();
  var months = ['jan', 'feb', 'mar', 'apr' , 'may', 'june' , 'july' ,'aug' , 'sep' , 'oct', 'nov' , 'dec']; // look up table of months
  var monthAsInt = parseInt( months.indexOf( month.toLowerCase() )) + 1;
  var newDateString = year + "/" + monthAsInt + "/" + day;
  var newDateObj = new Date(newDateString);
  return newDateObj
}


