var Job = require('../models/job'); // job model


module.exports = {
    
  // search for jobs

  getMatching: function(req, res)  {

      Job.find({ $text: { $search: req.body.searchterm } })
          .limit(20)
          .exec(function (err, items) {
              res.json(items); 
              //console.log(items);
          });
  }
};




