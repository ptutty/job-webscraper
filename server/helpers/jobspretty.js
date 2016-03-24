/**
 * Created by ptutty on 23/03/2016.
 */

var moment = require('moment'); // momentjs library
moment().format();


// human readable deadline dates using momentjs

module.exports = {
    deadlineDates: function(jobs) {
        var prettyjobs = [];

        jobs.forEach(function(job) {
            var obj2 = JSON.parse(JSON.stringify(job));
            obj2.deadline  = moment(job.deadline).format("dddd, MMMM Do YYYY");
            prettyjobs.push(obj2);
        });

        return prettyjobs;
    }
};

