var Job = require('../models/job'); // job model
var User = require('../models/user'); // user model
var mongoose = require('mongoose'); 				// mongoose for mongodb

module.exports = {

  // get users shortlist
  get: function(req, res) {
    // make sure user is logged in
    if (!req.isAuthenticated() ) {
      return res.status(200).json({
        status: false
      });
    }
    User.findById(req.user._id, function (err, doc) {
        if (err) {
            res.send(err);
        }

        // covert shortlist string ID's to objectID's
        var shortlist_array_as_objID = doc.shortlist.map(function(job_id){
            return mongoose.Types.ObjectId(job_id)
        });

        Job.find({
          '_id': { $in: shortlist_array_as_objID }}, function(err, docs){
            if (err) {
              res.send(err);
            }
              res.json(docs); // saved jobs
        });
    });
  },

  // add to users job shortlist
  add: function(req, res) {
    // make sure user is logged in
    if (!req.isAuthenticated() ) {
      return res.status(200).json({
        status: false
      });
    }

    User.findById(req.user._id, function (err, userToUpdate) {
       if (err) {
           res.send(err);
       }
       userToUpdate.shortlist.push(req.params.job_id);
       userToUpdate.save(function(err) {
           if (err)
             res.send(err);

             res.json(userToUpdate.shortlist);
             console.log('successfully saved');
       });
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
