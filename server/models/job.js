var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;


// create a schema
var jobSchema = new Schema({
  title: String,
  url: String,
  location: String,
  employer: String,
  salary: String,
  deadline: Date,
  job_id: String,
  created_at: Date,
  updated_at: Date,
  description: String,
});

jobSchema.plugin(mongoosePaginate);

//on every save, add the date
jobSchema.pre('save', function(next) {

  // change the updated_at field to current date
  this.created_at = new Date();
  next();
});

// the schema is useless so far
// we need to create a model using it
var Job = mongoose.model('Job', jobSchema);

// make this available to our users in our Node applications
module.exports = Job;
