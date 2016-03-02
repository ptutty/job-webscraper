var Job = require('../models/job'); // job model
var Jobsimport = require('../helpers/jobscrape'); //  module to import jobs

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
      employer: req.body.employer,
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
          jobToUpdate.employer = req.body.employer;
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
  },

  // bulk imports jobs into mongoDB from jobs.ac.uk scrap

  importJobs: function(req, res) {

    Jobsimport.get(function(data){
        // iterate over each job;
        data.jobs.forEach(function(newjob){
          addToDb(newjob);
        })
    });

    function addToDb(newjob){

      Job.count({job_id: newjob.job_id}, function (err, count){
        if(count>0){

          console.log("document with id: " + newjob.job_id + " exists");
        } else {
          console.log("document DOES NOT exists");
          //add new DB entry
          var addJob = new Job({
            title: newjob.title,
            salary: newjob.salary,
            employer: newjob.employer,
            url: newjob.href,
            deadline: newjob.deadline,
            job_id: newjob.job_id
          });

          addJob.save(function(err) {
              if (err)
                res.send(err);
          });
        }
      });

     }

 }




}
