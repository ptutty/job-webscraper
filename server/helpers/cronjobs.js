/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller

var CronJob = require('cron').CronJob;


new CronJob('00 40 8 * * 1-7', function() {
    /*
     * Runs 7 days a week
     * at 12:30:00 PM.
     */
    console.log("running the remove old jobs cron job");
    JobsTidyCtrl.checkDeadlineCron();
    console.log("running the import cron jobs");
    JobsImportCtrl.importJobs();

}, null, true, 'America/New_York');
