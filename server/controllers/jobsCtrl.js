var Job = require('../models/job'); // job model
var AppState = require('../models/appstate'); // job model
AppState.objectID = '56e6e270b8d507b8199db10f'; //object id document holding app state info in mongoDB


module.exports = {

  // get all jobs
  getJobs: function(req, res)  {

      // default options
      var options = {
          lean:     true,
          page:   1,
          limit:    25,
          sort: {deadline: 'asc'}
      };

      if (req.params.page) {
          options.page = req.params.page;
      }

      Job.paginate({}, options, function(err, result) {
          if (err) {
            res.send(err);
                  }
            res.send(result);
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
  }


    
}
