/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller



// var cron = require('cron');
//
// // running job twice a day
// var cronJob = cron.job("00 05 16 * * 0-6", function(){
//         console.log("start cron job");
//         JobsTidyCtrl.checkDeadlineCron();
//         JobsImportCtrl.importJobs();
// }, function () {
//     console.log("cron job has run");
//    },
//     true,
//     'America/New_York' /* Time zone of this job. */
// );
// cronJob.start();



var cron = require('cron');
var cronJob = cron.job("* */12 * * *", function(){
    // run every 12 hours
    console.info('cron job completed');
    JobsTidyCtrl.checkDeadlineCron();
    JobsImportCtrl.importJobs();
});
cronJob.start();


