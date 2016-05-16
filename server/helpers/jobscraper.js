
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var moment = require('moment');
moment().format();


/* all IT jobs on jobs.ac.uk (usually around 200) - displayed 400 at a time */
var baseURL = 'http://www.jobs.ac.uk/search/?category=3100&sort=gl&s=1&show=400';
var baseURLData;
var urlList = [];
var urlListData = [];




module.exports = function(moduleCallback) {

    async.series([
        // request baseurl HTML
        function (callback) {
            request(baseURL, function (error, response, html) {
                if (!error) {
                    baseURLData = html;
                    callback();
                }
            });
        },
        // traverse baseurl html for job links and add to array or urls
        function (callback) {
            $ = cheerio.load(baseURLData);
            var jobs = $('div.result');
            jobs.each(function (i, elem) {

                var $this = $(this);
                console.log("url to crawl: "  + $this.find('a').attr('href'));
                urlList.push('http://www.jobs.ac.uk' + $this.find('a').attr('href'));
            });
            callback();

        },
        // for each url in urls list request url and scrape job details
        function () {
            async.forEach(urlList, function (url, forEachCallback) {
                jobDetailScrape(url, forEachCallback);
            }, function (err) {
                if (err) cb(err, null);
                moduleCallback(null, urlListData);
            });
        }
    ]);
};




function jobDetailScrape(url, forEachCallback) {
    var jobDetails = {
        'title' : null,
        'salary': null,
        'location': null,
        'employer': null,
        'href': null,
        'job_id': null,
        'deadline': null,
        'description': null
    };

    request(url, function(error, response, html){
        if (error) {
        } else {
            $ = cheerio.load(html);

            // jobs.ac.uk has two job display templates - 'standard' and 'enhanced' - code for this
            var enhanced = false;
            var $standardcontent = $('div.content');
            var $enhancedcontent = $('div#enhanced-content');

            if ($standardcontent.length === 1) {
                doScrape($standardcontent, enhanced);
            } else if ($enhancedcontent.length === 1) {
                enhanced = true;
                doScrape($enhancedcontent, enhanced);
            }

            function doScrape($content, enhanced){
                jobDetails.title = $content.find('h1').text();
                jobDetails.employer = $content.find('h3').first().text();

                // get salary, location and date
                if (enhanced) {
                    $advert_details = $content.find('table.advert-details tr');
                    jobDetails.location = $advert_details.eq(0).find('td').eq(1).text().trim();
                    jobDetails.salary = $advert_details.eq(1).find('td').eq(1).text().trim();
                    var rawdate = $advert_details.eq(5).find('td').eq(1).text().trim();
                    var destext = $content.find('div.section').eq(0).html();
                } else {
                    $advert_details_left = $content.find('table.advert-details-left tr');
                    $advert_details_right = $content.find('table.advert-details-right tr');
                    jobDetails.salary = $advert_details_left.eq(1).find('td').eq(1).text().trim();
                    jobDetails.location = $advert_details_left.eq(0).find('td').eq(1).text().trim();
                    var rawdate = $advert_details_right.eq(1).find('td').eq(1).text().trim();
                    var destext = $content.find('div.section').eq(1).html();

                }

                //description
                jobDetails.description = destext;

                // date helper
                if (typeof rawdate === 'string') {
                    var datesplit = (rawdate).split(' ');
                    var day = datesplit[0].replace(/\D/g, '');
                    jobDetails.deadline = stringToDate(day, datesplit[1], datesplit[2]);
                }

                // job link
                jobDetails.href = $content.find("#job-apply-button > a").attr('href');

                // create unique id for job based on something unique on tha page
                var temp = $content.find("div.fb-share-button").attr('data-href');
                if (typeof temp === 'string') {
                    var urlparts = temp.split('/');
                    jobDetails.job_id = urlparts[4];
                }

                urlListData.push(jobDetails);
                forEachCallback();
            }

        }
    });
}


// add to mongodb as date object
function stringToDate(day, month, year) {
    var newDateString = year + "/"  + month + "/" + day;
    var newDateObj = new Date(newDateString);
    return newDateObj

}



