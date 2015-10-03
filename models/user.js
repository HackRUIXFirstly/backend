/**
 * Created by joeparrinello on 10/3/15.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebookName: {type: String, required: true},
  facebookId: {type: String, required: true}
});

model.exports = mongoose.model("User", userSchema);
