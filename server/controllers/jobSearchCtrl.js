var Job = require('../models/job'); // job model

module.exports = {

  // search for jobs
    getMatching: function(req, res)  {

        // default display options
        var options = {
            lean:     true,
            page:   1,
            limit:    5,
            sort: {deadline: 'asc'}
        };

        // is this a search or browse?
        var search = req.param('search');

        var query;
        if (search) {
            query = { $text: { $search: search }} ;
        } else {
            query = {};
        }

        // set the page of result to show
        if (req.params.page) {
            console.log(req.params.page);
            options.page = req.params.page;
        }

        // output results
        Job.paginate(query, options, function(err, result) {
            if (err) {
                res.send(err);
            }
            res.send(result);
        });
    }
};









