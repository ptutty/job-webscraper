var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var jobSchema = new Schema({
  title: String,
  url: String,
  employer: String,
  salary: String,
  deadline: String,
  job_id: String,
  shortlisted: Boolean,
  created_at: Date,
  updated_at: Date
});


//on every save, add the date
jobSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.created_at = currentDate;
  next();
});

// the schema is useless so far
// we need to create a model using it
var Job = mongoose.model('Job', jobSchema);

// make this available to our users in our Node applications
module.exports = Job;
