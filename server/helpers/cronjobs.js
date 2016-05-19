/**
 * Created by ptutty on 30/03/2016.
 */
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); // shortlist controller

var CronJob = require('cron').CronJob;




var job = new CronJob('00 55 8 * * 0-6', function() {
        /*
         * Runs everyday
         * at 8:55 EST or approx 1:55pm UK time - server is in NYC
         */

        JobsTidyCtrl.checkDeadlineCron();
        JobsImportCtrl.importJobs();

    }, function () {
        console.log("cron job has run");
    },
    true, /* Start the job right now */
    'America/New_York' /* Time zone of this job. */
);



