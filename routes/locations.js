var express = require('express');
var router = express.Router();
var LocationModel = require('../models/location');

var featureCollection = {
  "type": "FeatureCollection",
  "features": []
};

/* GET users listing. */
router.get('/locations', function(req, res) {
  LocationModel.all(function (err, rows) {
  	for (var i = 0; i < rows.length; i++) {
  		featureCollection.features.push({
	      "type": "Feature",
	      "geometry": {
	        "type": "Point",
	        "coordinates": [
	          parseFloat(rows[i].lon),
	          parseFloat(rows[i].lat)
	        ]
	      },
	      "properties": {
	        "time": rows[i].time
	      }
	    })
  	};
  	res.send(featureCollection);
  });
});

module.exports = router;
