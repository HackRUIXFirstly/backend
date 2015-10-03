var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
  res.send(
    {"version":"v1",
    "development": req.app.locals.ENV_DEVELOPMENT}
  );
});

module.exports = router;
