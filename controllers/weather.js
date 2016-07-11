var express = require('express');
var controller = express.Router();
var User = require('../models/Users');
var Weather = require('../models/Weather');
var coorRequest = require('../public/coordinates_request');
var weatherRequest = require('../public/weather_request');

controller.post('/search', function(req, res, next) {

	// user given location
	var userInput = req.body;
	var userLocation = userInput.inputLocation;
	var userAccounts = userInput.inputAccount;

	// HTTP request for coordinates
	var coordinatesAndCity = coorRequest.coordinatesAndCity(userLocation);
	var city = coordinatesAndCity.results[0].formatted_address;
	var lat = coordinatesAndCity.results[0].geometry.location.lat;
	var lng = coordinatesAndCity.results[0].geometry.location.lng;

	// HTTP request for current Weather and previous 5 days
	var allWeather = weatherRequest.get_current_weather(lat, lng);

	var location = {
		location: city,
		lat: lat,
		lng: lng,
		email: userAccounts,
		created_at: Date.now()
	};

	User.find({ email: userAccounts }, function(err, email) {			
		// This means it found a account in the database
		if (email.length >= 1) {
			// Created 
			Weather.create(location, function(err, users) {
				console.log('logged in!MMMMMMMMMMMMMMMMMMMMMMMMM');
				// Finding
				Weather.find({ email: userAccounts }, function(err, data) {
					console.log(data);
					res.json({ coordinatesAndCity: coordinatesAndCity,
						   	   	allWeather: allWeather,
						   	   	searchHistory: data
					});
				})
				
			});
		} else {
			console.log('not logged in!WWWWWWWWWWWWWWWWWWWWW');
			res.json({ coordinatesAndCity: coordinatesAndCity,
					   allWeather: allWeather,
					   searchHistory: undefined
					});
		}
	});
});




module.exports = controller;