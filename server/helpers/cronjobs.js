/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl_v3'); // shortlist controller

var CronJob = require('cron').CronJob;


new CronJob('00 50 16 * * 1-5', function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 4:50:00 PM. It does not run on Saturday
     * or Sunday.
     */
    JobsTidyCtrl.checkDeadlineCron();
    JobsImportCtrl.importJobs();

}, null, true, 'Europe/London');
