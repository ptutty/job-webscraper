/*
  scrapes supplied urls for jobs, parses HTML, writes essential data(title, salary , position) to JSON file.
*/
var http = require('http')
var bl = require('bl')
var cheerio = require('cheerio');
var fs = require('fs');
var moment = require('moment'); // momentjs library
moment().format();


// all IT jobs in midlands on jobs.ac.uk
var JobSites = [
  {"url" : "http://www.jobs.ac.uk/search/?keywords=&salary_from=&salary_to=&category=3100&jobtype=&location=02&sector=&show=100&x=31&y=15",
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

            success( jobScrape(data, site) );
        }))
      })
    });
  }
};


function jobScrape(data, site) {
  var jobBlob =  { "title": site.title, "lastupdated": new Date(), "jobs": [] };
  $ = cheerio.load( data.toString() );
  var jobs = $('div.result');

  jobs.each(function(i, elem) {
    var jobObject = {'title' : null, 'salary': null, 'employer': null ,'href': null, 'job_id': null, 'deadline': null };

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
  // saveDate( JSON.stringify(jobBlob) );
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




// saves data to file - not used
function saveDate(data) {
  fs.writeFile("data/jobs.json", data, function(err) {
      if(err) {
          return console.log(err);
      }
          return "jobs imported and saved successfully";
  });
}
