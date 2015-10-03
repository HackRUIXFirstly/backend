/**
 * Created by joeparrinello on 10/3/15.
 */

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

var User = require('../models/user.js');

passport.use(
  new FacebookTokenStrategy({
      clientID:"",
      clientSecret:""
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({facebookId: profile.id, facebookName: profile.name}, function (error, user) {
        return done(error, user);
      });
  })
);


