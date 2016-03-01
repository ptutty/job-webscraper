var Job = require('../models/job'); // job model

module.exports = {

  // get all jobs
  getJobs: function(res)  {
      Job.find(function (err, jobs) {
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err);
          }
          res.json(jobs); // return all jobs in JSON format
      });
  },

  // get single job
   getJob: function(req, res) {
      Job.findById(req.params.job_id, function (err, job) {
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err);
          }
          res.json(job); // returns job in JSON format
      });
  },

  createJob: function(req, res) {

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
          // _this.getJobs(res);
    });
  },


   // update job
   updateJob: function(req, res) {

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
  },

  deleteJob: function(req, res) {

    Job.remove({
        _id: req.params.job_id
    }, function (err, job) {
        if (err)
            res.send(err);
    });
  }


}
