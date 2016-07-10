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
	// HTTP request for current Weather
	var currentWeather = weatherRequest.get_current_weather(lat, lng);
	console.log(currentWeather);
	console.log('------------------------------- currentWeather')
	// previous 5 days AJAX
	var pastWeather = weatherAjax.get_pass_weather(coordinatesAndCity.lat, coordinatesAndCity.lng);
	console.log(pastWeather);
	console.log('------------------------------- pastWeather')

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