/**
 * Created by ptutty on 18/03/2016.
 */

var Job = require('../models/job'); // job model
var AppState = require('../models/appstate'); // app state model
var env  = require('dotenv').config();
var newJobsImported, totalJobCount;



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

    importJobs: function () { // bulk imports jobs into mongoDB from jobs.ac.uk scrape

        newJobsImported = 0;
        
        require('../helpers/jobscraper_async')(function(err, alljobs) {
            if (err) {
            } else {
                //console.log(alljobs);
                totalJobCount = alljobs.length;
                alljobs.forEach(function (item) {
                    addJob(item);
                })
            }
        });
        

    }
};




// updates meta in the database
function updateAppState() {

    console.log("total job countdown " + totalJobCount);
    console.log("new job total " + newJobsImported);

    if  ( totalJobCount == 0 && newJobsImported > 0) { // only update app state if there are new jobs
            console.log("updateapp state in db");

            AppState.findById(env.APP_STATE_ID, function (err, update) {
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



// does job already exist in database? If not add it.
// keep track of number added in newJobsImported.

function addJob(item){


    Job.count({job_id: item.job_id}, function (err, count){


        if (count <= 0) {  // collection does not exist - add job to mongoDB
            console.log("adding: " + item.job_id);
            var newJob = new Job({  //add new DB entry
                title: item.title,
                salary: item.salary,
                employer: item.employer,
                url: item.href,
                deadline: item.deadline,
                job_id: item.job_id,
                description: item.description,
                location: item.location
            });

            newJob.save(function (err) {
                if (err)
                    console.log(err);
            });
            newJobsImported++;
        }
        totalJobCount--;
        updateAppState();
    });
}
