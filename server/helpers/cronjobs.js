/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller


var cron = require('cron');
var cronJob = cron.job("* */12 * * *", function(){
    // run every 12 hours
    console.info('cron job completed');
    JobsTidyCtrl.checkDeadlineCron();
    JobsImportCtrl.importJobs();
});
cronJob.start();


