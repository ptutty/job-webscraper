/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller

var CronJob = require('cron').CronJob;




var job = new CronJob('00 55 8 * * 0-6', function() {
        /*
         * Runs every weekday (Monday through Friday)
         * at 11:30:00 AM. It does not run on Saturday
         * or Sunday.
         */

        console.log("running the remove old jobs cron job");
        JobsTidyCtrl.checkDeadlineCron();
        console.log("running the import cron jobs");
        JobsImportCtrl.importJobs();

    }, function () {
        console.log("cron job has run");
    },
    true, /* Start the job right now */
    'America/New_York' /* Time zone of this job. */
);



//
// new CronJob('00 40 8 * * 0-6', function() {
//     /*
//      * Runs 7 days a week
//      * at 12:30:00 PM.
//      */
//
//
// }, null, true, 'America/New_York');
