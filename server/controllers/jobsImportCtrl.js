/**
 * Created by ptutty on 18/03/2016.
 */

var Job = require('../models/job'); // job model
var AppState = require('../models/appstate'); // job model
AppState.objectID = '56e6e270b8d507b8199db10f'; //object id document holding app state info in mongoDB
var Jobsimport = require('../helpers/jobscrape'); //  module to import jobs

var newJobsImported = 0, totalJobCount = 0;

module.exports = {

    // JOB import controllers ==========================================
    // gets app state info - last job import timestamp , new jobs since last import

    getAppState: function (res) {
        AppState.findById(AppState.objectID, function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data); // returns job in JSON format
        })
    },

    importJobs: function (req, res) { // bulk imports jobs into mongoDB from jobs.ac.uk scrap
        Jobsimport.get(function (data) {
            totalJobCount = data.jobs.length;
            data.jobs.forEach(function (item) {
                addJob(item);
            })
        })
    }
};




// updates meta in the database
function updateAppState() {
    if  ( totalJobCount == 0 && newJobsImported > 0) { // only update app state if there are new jobs

            AppState.findById(AppState.objectID, function (err, update) {
                if (err) {
                    res.send(err);
                }
                update.newjobs = newJobsImported;
                update.updated_at = new Date();

                update.save(function(err) {
                    if (err)
                        res.send(err);
                })
            })
        }
}

function addJob(item){
    Job.count({job_id: item.job_id}, function (err, count){
        if (count <= 0) {  // collection does not exist - add job to mongoDB
            newJobsImported++;

            var newJob = new Job({  //add new DB entry
                title: item.title,
                salary: item.salary,
                employer: item.employer,
                url: item.href,
                deadline: item.deadline,
                job_id: item.job_id
            });

            newJob.save(function (err) {
                if (err)
                    res.send(err);
            })
        }
        totalJobCount--;
        updateAppState();
    })
}