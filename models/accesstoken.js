/**
 * Created by joeparrinello on 10/3/15.
 */
var mongoose = require('mongoose');

var accesstoken = mongoose.Schema({
  accesstoken: {type: String, required: true},
  facebookId: {type: String, required: true}
});

module.exports = mongoose.model("AccessToken", accesstoken);
