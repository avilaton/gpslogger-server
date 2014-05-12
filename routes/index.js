var express = require('express');
var router = express.Router();
var LocationModel = require('../models/location');

/* GET home page. */
router.get('/', function(req, res) {
  LocationModel.all(function (err, rows) {
  	res.render('index', {
  		layout: 'layout',
  		title: 'Express',
  		rows: rows
  	});
  });
});

module.exports = router;
