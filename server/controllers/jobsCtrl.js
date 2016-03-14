var Job = require('../models/job'); // job model
var AppState = require('../models/appstate'); // job model
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
    var jobsMeta = { "newjobs": 0 , "last_import": "not sure" };
    var totalJobCount = 0;

    Jobsimport.get(function(data){
        // iterate over each job;
        totalJobCount = data.jobs.length;
        data.jobs.forEach(function(newjob){
          addJobToDb( newjob );
        })
    });

    function jobsMetaUpdate(){
        totalJobCount--;
        if  ( totalJobCount == 0) {
            if (jobsMeta.newjobs > 0) { jobsMeta.last_import = new Date() };
            addMetaToDb()
            // res.json(jobsMeta);
        }
    }

    function addMetaToDb(){
      console.log("updating meta");
      var addAppMeta = new AppState({
        newjobs: jobsMeta.newjobs,
        updated_at: new Date()
      });
      addAppMeta.save(function(err) {
          if (err)
            res.send(err);
      });
    }



    function addJobToDb(newjob){
      Job.count({job_id: newjob.job_id}, function (err, count){
        if(count>0){
          // collection exists already
        } else {
          // collection does not exist - add job to mongoDB
          jobsMeta.newjobs++;
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
        } // end if
        jobsMetaUpdate();
      }); //end job count
    } //end addToDB
   } //end import jobs




}
