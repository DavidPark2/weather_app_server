var express = require('express');
var controller = express.Router();
var User = require('../models/Users');
var Weather = require('../models/Weather');
var coordinatesAjax = require('../public/coordinates_ajax')
var weatherAjax = require('../public/weather_ajax')

controller.post('/search', function(req, res, next) {
	// user given location
	var userLocation = req.body.location;
	// coordinates AJAX
	var coordinatesAndCity = coordinatesAjax.get_coordinates(userLocation);
	// current weather AJAX
	var currentWeather = weatherAjax.get_current_weather(coordinatesAndCity.lat, coordinatesAndCity.lng);
	// previous 5 days AJAX
	var pastWeather = weatherAjax.get_pass_weather(coordinatesAndCity.lat, coordinatesAndCity.lng);

	var location = {
		location: coordinatesAndCity.city,
		lat: coordinatesAndCity.lat,
		lng: coordinatesAndCity.lng,
		email: req.session.email,
		created_at: Date.now()
	};
	// testing if location works correctly
	console.log(location);

	User.find({ email: req.session.email }, function(err, email) {			
		// This means it found a account in the database
		if (email.length >= 1) {
			Weather.Create(location, function(err, users) {
				res.json({ coordinatesAndCity: coordinatesAndCity,
					   	   currentWeather: currentWeather,
					   	   pastWeather: pastWeather,
					   	   searchHistory: [{
					   			location: user.location,
					   			created_at: user.created_at}]
				});
			});
		} else {
			res.json({ coordinatesAndCity: coordinatesAndCity,
					   currentWeather: currentWeather,
					   pastWeather: pastWeather});
		}
	});
});




module.exports = controller;