/**
 * Created by joeparrinello on 10/3/15.
 */

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

var User = require('../models/user.js');

passport.use(
  new FacebookTokenStrategy({
      clientID:process.env.FACEBOOK_CLIENT_ID,
      clientSecret:process.env.FACEBOOK_SECRET
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({facebookId: profile.id}, function (error, user) {
        if (user){
          return done(error, user);
        } else {
          User.create({facebookName: profile.name.givenName + profile.name.familyName} , function(error, newUser){
            return done(error,newUser);
          })
        }
      });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;


