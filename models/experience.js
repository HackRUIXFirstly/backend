/**
 * Created by joeparrinello on 10/3/15.
 */
var mongoose = require('mongoose');

var experienceSchema = mongoose.Schema({
  text: {type: String, required: true},
  facebookId: {type: String, required: true},
  dateCreated: {type: Date, required: true}
});

module.exports = mongoose.model("Experience", experienceSchema);
