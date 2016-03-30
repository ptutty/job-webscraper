
var Job = require('../models/job'); // job model
var moment = require('moment'); // momentjs library
moment().format();

module.exports = {

    /* remove jobs that are passed deadline */

    checkDeadline: function (res) {
        // iterate over all jobs and remove job with deadlines which passed yesterday

        Job.remove({deadline: { "$lt" : yesterday() } },function(err, doc) {
            if (doc){
                res.json("documents removed " + doc); // returns these jobs in JSON format
            } else  {
                res.json("documents removed " + doc);
            }
        });
    }
};



// yesterdays date
function yesterday() {
    var currentDate = moment().subtract(1, "days");
    return new Date( currentDate.toISOString() );
}
