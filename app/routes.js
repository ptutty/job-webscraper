
// var Jobscrape = require('./helpers/jobscrape'); //  module to import jobs
var Jobsctrl = require('./controllers/jobs_ctrl'); // jobs controller

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    //get all jobs
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

    //
    // app.get('/api/scrape', function (req, res) {
    //   Jobscrape.getJobs();
    //   res.send('updating');
    // });



};
