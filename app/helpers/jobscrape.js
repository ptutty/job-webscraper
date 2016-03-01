/*
  scrapes supplied urls for jobs, parses HTML, writes essential data(title, salary , position) to JSON file.
*/
module.exports = {
  getJobs: function () {
    JobSites.forEach(function(site) {
      http.get(site.url, function (request) {
        request.pipe(bl(function (err, data) {
          if (err)
            return console.error(data)
            jobScrape(data, site);
        }))
      })
    });
  }
};

var http = require('http')
var bl = require('bl')
var cheerio = require('cheerio');
var fs = require('fs');
var JobSites = [
  {"url" : "http://www.jobs.ac.uk/search/?keywords=javascript&salary_from=&salary_to=&jobtype=&location=&sector=&show=100&x=51&y=15",
  "title" : "jobs.ac.uk",
  "baseUrl" : "http://www.jobs.ac.uk/"
  }
]

function jobScrape(data, site) {
  var jobBlob =  { "title": site.title, "lastupdated": new Date(), "jobs": [] };
  $ = cheerio.load( data.toString() );
  var jobs = $('div.text');

  jobs.each(function(i, elem) {
    var jobObject = {'title' : null, 'salary': null, 'employer': null ,'href': null };
    var $this = $(this);
    jobObject.href = site.baseUrl + $this.find('a').attr('href');
    jobObject.title = $this.find('a').text().trim();
    jobObject.employer = $this.find('div.employer').text().trim();
    var info = $this.find('div.info').text();
    var pos = info.indexOf("£");
    var salary = info.substr(pos, 22).trim();
    jobObject.salary  = salary;
    jobBlob.jobs.push(jobObject);
  });
  saveDate( JSON.stringify(jobBlob) );
}

function saveDate(data) {
  fs.writeFile("data/jobs.json", data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}
