/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller



var cron = require('cron');

// running job twice a day
var cronJob = cron.job("00 55 15 * * 1-5", function(){
        console.log("start cron job");
        JobsTidyCtrl.checkDeadlineCron();
        JobsImportCtrl.importJobs();
}, function () {
    console.log("cron job has run");
   },
    true,
    'America/New_York' /* Time zone of this job. */
);
cronJob.start();



// var cron = require('cron');
// var cronJob = cron.job("0 */1 * * * *", function(){
//     // perform operation e.g. GET request http.get() etc.
//     console.info('cron job completed');
// });
// cronJob.start();


