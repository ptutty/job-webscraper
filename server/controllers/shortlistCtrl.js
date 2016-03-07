var Job = require('../models/job'); // job model
var User = require('../models/user'); // user model


module.exports = {

  get: function(req, res) {
    // find current user
    if (!req.isAuthenticated() ) {
      return res.status(200).json({
        status: false
      });
    }
    res.status(200).json({
      status: true,
      user_id: req.user._id
    });

  }
          // var currentuser = req.user // currently logged in user
          // console.log("current logged in user" + currentuser);
          // res.json("current logged in user " + currentuser ); // shortlist array
          // User.findById(currentuser, function (err, shortlist) {
          //     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          //     if (err) {
          //         res.send(err);
          //     }
          //     res.json(shortlist); // shortlist array
          // });


  // // get single job
  //  getJob: function(req, res) {
  //     Job.findById(req.params.job_id, function (err, job) {
  //         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
  //         if (err) {
  //             res.send(err);
  //         }
  //         res.json(job); // returns job in JSON format
  //     });
  // },
  //
  // createJob: function(req, res) {
  //
  //   var newJob = new Job({
  //     title: req.body.title,
  //     salary: req.body.salary,
  //     employer: req.body.employer,
  //     url: req.body.url,
  //     deadline: req.body.deadline
  //   });
  //
  //   newJob.save(function(err) {
  //       if (err)
  //         res.send(err);
  //         // _this.getJobs(res);
  //   });
  // },
  //
  //
  //  // update job
  //  updateJob: function(req, res) {
  //     Job.findById(req.params.job_id, function (err, jobToUpdate) {
  //         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
  //         if (err) {
  //             res.send(err);
  //         }
  //         jobToUpdate.title = req.body.title;
  //         jobToUpdate.salary = req.body.salary;
  //         jobToUpdate.employer = req.body.employer;
  //         jobToUpdate.url = req.body.url;
  //         jobToUpdate.deadline = req.body.deadline;
  //
  //         jobToUpdate.save(function(err) {
  //             if (err)
  //               res.send(err);
  //
  //               res.json(jobToUpdate);
  //               console.log('successfully saved');
  //         });
  //     });
  // },
  //
  // deleteJob: function(req, res) {
  //   Job.remove({
  //       _id: req.params.job_id
  //   }, function (err, job) {
  //       if (err)
  //           res.send(err);
  //   });
  // },




}
