var express = require('express');
var router = express.Router();
var passport = require('../authentication/passport.js');

var async = require('async');

var Experience = require("../models/experience.js");
var AccessToken = require("../models/accesstoken.js");

var FB = require('fb');

router.get('/', function (req, res) {
    res.send(
        {
            "version": "v1",
            "development": req.app.locals.ENV_DEVELOPMENT
        }
    );
});

router.use(passport.authenticate('facebook-token'));

router.post('/auth/facebook', function (req, res, next) {
    res.sendStatus(req.user ? 200 : 401);
});

router.get('/user', function(req, res, next){
   res.send(req.user);
});

router.get('/user/feed', function(req, res, next){
    AccessToken.findOne({facebookId:req.user.facebookId},{},{ sort: { 'created_at' : -1 } }, function(err, accessToken){
        if (accessToken){

            FB.setAccessToken(accessToken.accesstoken);

            FB.api('/me/friends', function (fbRes) {
                if(!fbRes || fbRes.error) {
                    return next(!fbRes ? 'error occurred' : fbRes.error);
                } else {
                    async.map(fbRes.data, function(item, callback){
                        callback(null, item.id);
                    }, function(err, results){
                        if(err){
                            return next(err);
                        }
                        results.push(req.user.facebookId);
                        Experience.find({facebookId:{$in:results}},null,{sort:{'dateCreated':-1}}, function(err, experiences){
                            if(err){
                                return next(err);
                            }
                            res.send(experiences);
                        });
                    });
                }
            });

        } else {
            return next(new Error("Access Token Not Found"));
        }
    });
});

router.get('/user/friends', function(req, res, next){

    AccessToken.findOne({facebookId:req.user.facebookId},{},{ sort: { 'created_at' : -1 } }, function(err, accessToken){
        if (accessToken){
            FB.setAccessToken(accessToken.accesstoken);

            FB.api('/me/friends', function (fbRes) {
                if(!fbRes || fbRes.error) {
                    return next(!fbRes ? 'error occurred' : fbRes.error);
                } else {
                    async.map(fbRes.data, function(item, callback){
                        callback(null, item.id);
                    }, function(err, results){
                        if(err){
                            return next(err);
                        }
                        res.send(results);
                    });
                }
            });

        } else {
            return next(new Error("Access Token Not Found"));
        }
    });


});

router.get('/user/friends/experiences', function(req, res, next){
    AccessToken.findOne({facebookId:req.user.facebookId},{},{ sort: { 'created_at' : -1 } }, function(err, accessToken){
        if (accessToken){
            FB.setAccessToken(accessToken.accesstoken);

            FB.api('/me/friends', function (fbRes) {
                if(!fbRes || fbRes.error) {
                    return next(!fbRes ? 'error occurred' : fbRes.error);
                } else {
                    async.map(fbRes.data, function(item, callback){
                        callback(null, item.id);
                    }, function(err, results){
                        if(err){
                            return next(err);
                        }
                        Experience.find({facebookId:{$in:results}},null,{sort:{'dateCreated':-1}}, function(err, experiences){
                            if(err){
                                return next(err);
                            }
                            res.send(experiences);
                        });
                    });
                }
            });

        } else {
            return next(new Error("Access Token Not Found"));
        }
    });
});

router.get('/user/:id', function(req, res, next){
   User.findOne({facebookId:req.params.id}, function (error, user) {
       if (error) {
           return next(error);
       }
       if(user){
            res.send(user);
       } else {
           return next(new NotFoundError);
       }
   })
});

router.post('/experience', function (req, res, next) {
    //TODO validate all options are there
    if (req.body.text){
        Experience.create({
            text: req.body.text,
            facebookId: req.user.facebookId,
            dateCreated: Date.now()
        }, function (error, experience) {
            if(error) {
                return next(error);
            }
            if (experience) {
                res.send(experience);
            } else {
                res.sendStatus(400);
            }
        });
    } else {
        return next(new Error("text field not populated"));
    }

});

router.get('/experience', function(req,res, next){
    Experience.find({facebookId:req.user.facebookId}, function(error, experiences){
        if(error){
            return next(error);
        }
        if(experiences){
            res.send(experiences);
        } else {
            return next(new NotFoundError);
        }
    });
});

router.get('/experience/:id', function(req, res, next){
    Experience.findById(req.params.id, function(error, experience){
        if(error){
            return next(error);
        }
        if(experience){
            res.send(experience);
        } else {
            if(error){
                return next(new NotFoundError);
            }
        }
    });
});

router.get('/user/:facebookId/experience', function(req, res, next) {
    Experience.find({facebookId:req.params.facebookId}, function(error, experiences){
        if(error) {
            return next(error);
        }
        if(experiences){
            res.send(experiences);
        } else {
            return next(new NotFoundError);
        }

    });
});

module.exports = router;
