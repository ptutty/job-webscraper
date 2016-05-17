var Jobsctrl = require('../controllers/jobsCtrl'); // jobs controller
var Shortlistsctrl = require('../controllers/shortlistCtrl'); // shortlist controller
var JobsImportCtrl = require('../controllers/jobsImportCtrl'); //import jobs into MongoDB
var JobsTidyCtrl = require('../controllers/jobsTidyCtrl'); // tidy up old jobs
var JobSearch = require('../controllers/jobSearchCtrl'); // search jobs


module.exports = function (app) {

    // api ---------------------------------------------------------------------

    // ALL JOBS =======================================================
    app.get('/api/jobs', function (req, res) {
        Jobsctrl.getJobs(req, res);
    });

    // one page of result limited to 5
    // app.get('/api/jobs/page/:page', function (res, req) {
    //     Jobsctrl.getJobs(res, req);
    // });
    //

    // get a single job
    app.get('/api/job/:job_id', function (req, res) {
        Jobsctrl.getJob(req, res);
    });

    // create job and send back all jobs after creation
    app.post('/api/jobs', function (req, res) {
        Jobsctrl.createJob(req, res);
    });

    // updates a single job
    app.put('/api/job/:job_id', function (req, res) {
      Jobsctrl.updateJob(req, res);
    });


    // delete a job
    app.delete('/api/job/:job_id', function (req, res) {
        Jobsctrl.deleteJob(req, res);
    });

    // SEARCHING JOBS ================================================

    // search for a job
    app.post('/api/search/', function (req, res) {
        JobSearch.getMatching(req, res);
    });



    // IMPORTING and REMOVING JOBS ================================================

    // import bulk jobs
    app.get('/api/import', function (req, res) {
        JobsImportCtrl.importJobs(res);
    });

    // gets meta information from mongoDB about last import and new job
    app.get('/api/appstate', function (req, res) {
        JobsImportCtrl.getAppState(res);
    });

    // Remove jobs that have pass deadline from mongoDB
    app.get('/api/jobsclean', function (req, res) {
        JobsTidyCtrl.checkDeadline(res);
    });



    // SHORTLISTED JOBS ==============================================

    // GET USERS SHORTLISTED JOBS
    app.get('/api/shortlist/', function (req, res) {
        Shortlistsctrl.get(req, res);
    });

    // ADD JOB TO SHORTLIST
    app.put('/api/shortlist/:job_id', function (req, res) {
        Shortlistsctrl.add(req, res);
    });

    // remove JOB from SHORTLIST
    app.delete('/api/shortlist/:job_id', function (req, res) {
        Shortlistsctrl.delete(req, res);
    })

};
