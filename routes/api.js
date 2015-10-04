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

router.get('/user/:facebookId/experience');

module.exports = router;
