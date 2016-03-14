var Jobsctrl = require('../controllers/jobsCtrl'); // jobs controller
var Shortlistsctrl = require('../controllers/shortlistCtrl'); // shortlist controller


module.exports = function (app) {

    // api ---------------------------------------------------------------------

    // ALL JOBS =======================================================
    app.get('/api/jobs', function (req, res) {
        Jobsctrl.getJobs(res);
    });

    // get a single job
    app.get('/api/job/:job_id', function (req, res) {
        Jobsctrl.getJob(req, res);
    });

    // createjob and send back all jobs after creation
    app.post('/api/jobs', function (req, res) {
        Jobsctrl.createJob(req, res);
    });

    // updates a single job
    app.put('/api/job/:job_id', function (req, res) {
      Jobsctrl.updateJob(req, res);
    });


    // // delete a job
    app.delete('/api/job/:job_id', function (req, res) {
        Jobsctrl.deleteJob(req, res);
    });

    // import bulk jobs
    app.get('/api/import', function (req, res) {
      Jobsctrl.importJobs(req, res);
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
    });



};
