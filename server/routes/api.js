var Jobsctrl = require('../controllers/jobsCtrl'); // jobs controller
var passport = require('passport');



module.exports = function (app, User) {


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

    // imports fresh jobs
    app.get('/api/import', function (req, res) {
      Jobsctrl.importJobs(req, res);
    });

    // register route
    app.post('/register', function(req, res) {
      User.register(new User({ username: req.body.username }),
        req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
    });



};
