var Job = require('./models/job');

// get all jobs
function getJobs(res) {
    Job.find(function (err, jobs) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(jobs); // return all jobs in JSON format
    });
};

// get single job
function getJob(req, res) {
    Job.findById(req.params.job_id, function (err, job) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(job); // returns job in JSON format
    });
};


// update job
function updateJob(req, res) {

    Job.findById(req.params.job_id, function (err, jobToUpdate) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        jobToUpdate.title = req.body.title;
        jobToUpdate.salary = req.body.salary;
        jobToUpdate.location = req.body.location;
        jobToUpdate.url = req.body.url;
        jobToUpdate.deadline = req.body.deadline;

        jobToUpdate.save(function(err) {
            if (err)
              res.send(err);

              res.json(jobToUpdate);
              console.log('successfully saved');
        });

    });
};




module.exports = function (app) {

    // api ---------------------------------------------------------------------

    //get all jobs
    app.get('/api/jobs', function (req, res) {
        getJobs(res);
    });


    // get a single job
    app.get('/api/job/:job_id', function (req, res) {
        getJob(req, res);
    });


    // createjob and send back all jobs after creation
    app.post('/api/jobs', function (req, res) {

      var newJob = new Job({
        title: req.body.title,
        salary: req.body.salary,
        location: req.body.location,
        url: req.body.url,
        deadline: req.body.deadline
      });

      newJob.save(function(err) {
          if (err)
            res.send(err);
            getJobs(res);
      });

    });


    // updates a single job
    app.put('/api/job/:job_id', function (req, res) {
      updateJob(req, res);
    });


    // delete a job
    app.delete('/api/job/:job_id', function (req, res) {
        Job.remove({
            _id: req.params.job_id
        }, function (err, job) {
            if (err)
                res.send(err);

            getJobs(res);
        });
    });




};
