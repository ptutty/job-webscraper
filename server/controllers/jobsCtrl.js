var Job = require('../models/job'); // job model
var AppState = require('../models/appstate'); // job model
AppState.objectID = '56e6e270b8d507b8199db10f'; //object id document holding app state info in mongoDB
var Jobsimport = require('../helpers/jobscrape'); //  module to import jobs



module.exports = {
  // get all jobs
  getJobs: function(res)  {

      Job.find().lean().exec(function(err, doc) {
          if (err) {
              res.send(err);
          }
          res.json(doc);
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

  // JOB import controllers ==========================================

  // gets app state info - last job import timestamp , new jobs since last import

  getAppState: function(res) {
    AppState.findById(AppState.objectID, function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data); // returns job in JSON format
    });
  },


  // bulk imports jobs into mongoDB from jobs.ac.uk scrap
  importJobs: function(req, res) {
    var newJobsImported = 0;
    var totalJobCount = 0;

    Jobsimport.get(function(data){
        // iterate over each job;
        totalJobCount = data.jobs.length;
        data.jobs.forEach(function(newjob){
          addJobToDb( newjob );
        })
    });

    function newJobsCount(){
        totalJobCount--;
        if  ( totalJobCount == 0) {
            if (newJobsImported > 0) { // only update app state if there are new jobs
              updateAppState();
            };
        }
    }

    // updates meta in the database
    function updateAppState(){
      AppState.findById(AppState.objectID, function (err, update) {
          if (err) {
              res.send(err);
          }
          update.newjobs = newJobsImported,
          updated_at = new Date();

          update.save(function(err) {
              if (err)
                res.send(err);
          });
      });
    }

    function addJobToDb(newjob){
      Job.count({job_id: newjob.job_id}, function (err, count){
        if(count>0){
          // collection exists already
        } else {
          // collection does not exist - add job to mongoDB
          newJobsImported++;
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
        newJobsCount();
      }); //end job count
    } //end addToDB
   } //end import jobs

    
}
