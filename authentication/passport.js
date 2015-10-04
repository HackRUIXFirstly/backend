/**
 * Created by joeparrinello on 10/3/15.
 */

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

var User = require('../models/user.js');
var AccessToken = require('../models/accesstoken.js');

passport.use(
    new FacebookTokenStrategy({
            clientID:process.env.FACEBOOK_CLIENT_ID,
            clientSecret:process.env.FACEBOOK_SECRET
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOneAndUpdate({facebookId: profile.id}, {$set: {facebookName: profile.name.givenName + " " +profile.name.familyName}},{upsert:true, new:true},  function (error, user) {
                //TODO Handle Error
                if (user){
                    AccessToken.findOneAndUpdate({accesstoken: accessToken}, {$set: {facebookId: profile.id}},{upsert:true, new:true},  function (error, token) {
                        //TODO Handle Error
                        if (token){
                            return done(error, user);
                        }
                    });
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


