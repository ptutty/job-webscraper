/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller



var cron = require('cron');

// running job twice a day
var cronJob = cron.job("00 30 5 * * 1-6", function(){
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




