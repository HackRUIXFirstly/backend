var express = require('express');
var router = express.Router();
var passport = require('../authentication/passport.js');

router.get('/', function(req,res){
  res.send(
    {"version":"v1",
    "development": req.app.locals.ENV_DEVELOPMENT}
  );
});

router.post('/auth/facebook', passport.authenticate('facebook-token'), function(req,res){
  res.sendStatus(req.user? 200 : 401);
});

module.exports = router;
