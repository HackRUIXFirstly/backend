/**
 * Created by joeparrinello on 10/3/15.
 */

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

var User = require('../models/user.js');
var AccessToken = require('../model/accesstoken.js');

passport.use(
    new FacebookTokenStrategy({
            clientID:process.env.FACEBOOK_CLIENT_ID,
            clientSecret:process.env.FACEBOOK_SECRET
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOneAndUpdate({facebookId: profile.id}, {$set: {facebookName: profile.name.givenName + " " +profile.name.familyName}},{upsert:true, new:true},  function (error, user) {
                if (user){
                    AccessToken.findOneAndUpdate({accessToken: accessToken}, {$set: {facebookId: profile.id}},{upsert:true, new:true},  function (error, accessToken) {
                        if (accessToken){
                            return done(error, user);
                        }
                    });
                    return done(error, user);
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


