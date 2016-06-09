var Job = require('../models/job'); // job model

module.exports = {

  // search for jobs
    getMatching: function(req, res)  {

        // default display options
        var options = {
            lean:     true,
            page:   1,
            limit:    20,
            sort: {deadline: 'asc'}
        };

        var search = req.param('search');
        var sortparam = req.param('sort');

        if (sortparam) {
            options.sort.deadline =  sortparam;
        }


        var query;
        if (search) {
            query = { $text: { $search: search }} ;
        } else {
            query = {};
        }

        // set the page of result to show
        if (req.params.page) {
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









