var express = require('express');
var controller = express.Router();
var User = require('../models/Users');
var Weather = require('../models/Weather');
var coorRequest = require('../public/coordinates_request');
var weatherRequest = require('../public/weather_request');

controller.post('/search', function(req, res, next) {

	// user given location
	var userLocation = req.body.location;
	console.log(userLocation);
	console.log('------------------------------- userLocation')

	// HTTP request for coordinates
	var coordinatesAndCity = coorRequest.coordinatesAndCity(userLocation);
	var city = coordinatesAndCity.results[0].formatted_address;
	var lat = coordinatesAndCity.results[0].geometry.location.lat;
	var lng = coordinatesAndCity.results[0].geometry.location.lng;
	console.log(city);
	console.log(lat);
	console.log(lng);
	console.log('------------------------------- coordinatesAndCity')
	// HTTP request for current Weather and previous 5 days
	var allWeather = weatherRequest.get_current_weather(lat, lng);
	console.log(allWeather);
	console.log('------------------------------- allWeather')

	var location = {
		location: city,
		lat: lat,
		lng: lng,
		email: req.session.email,
		created_at: Date.now()
	};
	// testing if location works correctly
	console.log(location);
	console.log(req.session.email);
	console.log('EMAIL EMAIL EMAIL');

	User.find({ email: req.session.email }, function(err, email) {			
		// This means it found a account in the database
		if (email.length >= 1) {
			Weather.create(location, function(err, users) {
				console.log('logged in!MMMMMMMMMMMMMMMMMMMMMMMMM');
				res.json({ coordinatesAndCity: coordinatesAndCity,
					   	   allWeather: allWeather,
					   	   searchHistory: [{
					   	   	// CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					   			location: email.location,
					   			created_at: email.created_at}]
				});
			});
		} else {
			console.log('not logged in!WWWWWWWWWWWWWWWWWWWWW');
			res.json({ coordinatesAndCity: coordinatesAndCity,
					   allWeather: allWeather});
		}
	});
});




module.exports = controller;