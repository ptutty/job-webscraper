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
     },

     delete: function(req, res) {
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

          // iterate over array - remove item - user map or reduce
          var updatedShortlist = [];
          updatedShortlist = userToUpdate.shortlist.filter(function(item){
            return item !== req.params.job_id;
          })

          userToUpdate.shortlist = updatedShortlist;

          userToUpdate.save(function(err) {
              if (err)
                res.send(err);

                res.json(userToUpdate.shortlist);
                console.log('successfully saved');
          });
       });
    }


};
