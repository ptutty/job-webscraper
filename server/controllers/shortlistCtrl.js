var Job = require('../models/job'); // job model
var User = require('../models/user'); // user model


module.exports = {

  get: function(req, res) {

    // make sure user is logged in
    if (!req.isAuthenticated() ) {
      return res.status(200).json({
        status: false
      });
    }

    // get user_id of logged in
    var user_id = req.user._id;
    var shortlist_array = [];

    // find user in MongoDB by ID
    User.findById(user_id, function (err, data) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        shortlist_array = data.shortlist;
        //res.json(data.shortlist); // shortlist array
    });


    // find item is jobs schema by ID in array - does mongoose shema take arrays as argument
    Jobs.findById(shortlist_array, function (err, jobs) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(jobs); // shortlist array
    });

  },


  // update user shortlist
  update: function(req, res) {

    // make sure user is logged in
    if (!req.isAuthenticated() ) {
      return res.status(200).json({
        status: false
      });
    }
    // get user_id of logged in
    var user_id = req.user._id;

     User.findById(user_id, function (err, userToUpdate) {
         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
         if (err) {
             res.send(err);
         }
         userToUpdate.shortlist.push("new item");
        //  jobToUpdate.salary = req.body.salary;
        //  jobToUpdate.employer = req.body.employer;
        //  jobToUpdate.url = req.body.url;
        //  jobToUpdate.deadline = req.body.deadline;

         userToUpdate.save(function(err) {
             if (err)
               res.send(err);

               res.json(userToUpdate);
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
