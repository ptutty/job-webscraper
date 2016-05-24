/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller



var cron = require('cron');

// running job every 1 minutes:
var cronJob = cron.job("0 */1 * * * *", function(){
    console.info('cron job completed');
});
cronJob.start();



// var CronJob = require('cron').CronJob;
// var job = new CronJob('00 20 5 * * 0-6', function() {
//         /*
//          * Runs everyday
//          * at 5:20 EST or approx 10:20am UK time - server is in NYC
//          */
//         console.log("start cron job");
//         JobsTidyCtrl.checkDeadlineCron();
//         JobsImportCtrl.importJobs();
//
//     }, function () {
//         console.log("cron job has run");
//     },
//     false, /* Start the job right now */
//     'America/New_York' /* Time zone of this job. */
// );



