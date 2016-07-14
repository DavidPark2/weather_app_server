var request = require('request');
var deasync = require('deasync');

var api = process.env.MAPS_KEY;
var forecastAPI = process.env.FORECAST;

module.exports.coordinatesAndCity = function(coor) {
	var location;
	// Retrieving coordinates from zip code or city, state
	request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + coor + "&=key" + api, function (err, res, body) {
		location = body;
	})
	while(location === undefined) {
		deasync.runLoopOnce();
	}
	return JSON.parse(location);
}
