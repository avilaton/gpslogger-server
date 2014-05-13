var express = require('express');
var router = express.Router();
var LocationModel = require('../models/location');

/* GET users listing. */
router.get('/log', function(req, res) {
  console.log(req.query);
  LocationModel.insert({
  	lat: req.query.lat, 
  	lon: req.query.lon,
  	time: req.query.time
  });
  res.send(200, 'ok');
});

module.exports = router;
