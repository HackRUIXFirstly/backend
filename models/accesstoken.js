/**
 * Created by joeparrinello on 10/3/15.
 */
var mongoose = require('mongoose');

var accesstoken = mongoose.Schema({
    accesstoken: {type: String, required: true},
    _user: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
    created_at:{type:Date, default:Date.now()}
});

module.exports = mongoose.model("AccessToken", accesstoken);
