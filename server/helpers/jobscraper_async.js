
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');


var baseURL = 'http://www.jobs.ac.uk/search/?category=3100&sort=gl&s=1&show=2';
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
    request(url, function(error, response, html){
        if(!error){
            var jobDetails = {
                'title' : null,
                'salary': null,
                'location': null,
                'employer': null,
                'href': null,
                'job_id': null,
                'deadline': null,
                'description': null};

            $ = cheerio.load(html);
            var $content = $('div.content');
            jobDetails.title = $content.find('h1').text();
            jobDetails.employer = $content.find('h3').first().text();
            $advert_details_left = $content.find('table.advert-details-left tr');
            $advert_details_right = $content.find('table.advert-details-right tr');
            jobDetails.salary = $advert_details_left.eq(1).find('td').eq(1).text().trim();
            jobDetails.location = $advert_details_left.eq(0).find('td').eq(1).text().trim();
            jobDetails.deadline = $advert_details_right.eq(1).find('td').eq(1).text().trim();
            jobDetails.description = $content.find('div.section').eq(1).html();
            jobDetails.href = $content.find("#job-apply-button > a").attr('href');

            urlListData.push(jobDetails);
            forEachCallback();
        };
    });
}






