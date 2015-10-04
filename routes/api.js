var express = require('express');
var router = express.Router();
var passport = require('../authentication/passport.js');

var Experience = require("../models/experience.js");

router.get('/', function (req, res) {
    res.send(
        {
            "version": "v1",
            "development": req.app.locals.ENV_DEVELOPMENT
        }
    );
});

router.post('/auth/facebook', passport.authenticate('facebook-token'), function (req, res) {
    res.sendStatus(req.user ? 200 : 401);
});

router.post('/experience', passport.authenticate('facebook-token'), function (req, res) {
    //TODO validate all options are there
    Experience.create({
        text: req.body.text,
        facebookId: req.user.facebookId,
        dateCreated: Date.now()
    }, function (error, experience) {
        //TODO Handle Error;
        if (experience) {
            res.send(experience);
        } else {
            res.sendStatus(400);
        }
    });
});

router.get('/experience', passport.authenticate('facebook-token'), function(req,res){
    Experience.find({facebookId:req.user.facebookId}, function(error, experiences){
        //TODO catch error
        if(experiences){
            res.send(experiences);
        } else {
            //TODO Throw Error
        }
    });
});

router.get('/experience/:id', passport.authenticate('facebook-token'), function(req,res){
    Experience.findById(req.params.id, function(error, experience){
        //TODO catch error
        if(experience){
            res.send(experience);
        } else {
            //TODO Throw Error
        }
    });
});

router.get('/user/:facebookId/experience', passport.authenticate('facebook-token'), function(req, res) {
    Experience.find({facebookId:req.params.facebookId}, function(error, experiences){
       //TODO catch error
        if(experiences){
            res.send(experiences);
        } else {
            //TODO Throw Error
        }
    });
});

module.exports = router;
