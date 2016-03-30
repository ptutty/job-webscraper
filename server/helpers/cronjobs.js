/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller

var CronJob = require('cron').CronJob;


new CronJob('0 */1 * * * *', function() {
    console.log('tidy jobs every minute');
    JobsTidyCtrl.checkDeadlineCron();
    JobsImportCtrl.importJobs();

}, null, true, 'Europe/London');
