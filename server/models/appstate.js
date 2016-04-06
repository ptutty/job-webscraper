var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for app meta-data
var appstateSchema = new Schema({
  newjobs: Number,
  updated_at: Date
});




//on every save, add the date
appstateSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  next();
});

// we need to create a model using it
var Appstate = mongoose.model('Appstate', appstateSchema);

// make this available to our users in our Node applications
module.exports = Appstate;
