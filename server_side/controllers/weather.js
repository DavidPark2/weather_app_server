var express = require('express');
var controller = express.Router();
var User = require('../models/Users');
var Weather = require('../models/Weather');
var $ = require("jquery");

// This function will get weather from forecast.io
function get_forecast(location) {
	// In Unix Timestamp
	var currentTime = Math.round(new Date().getTime()/1000.0);
	var oneDayBefore = currentTime - (60 * 60 * 24);
	var twoDayBefore = oneDayBefore - (60 * 60 * 24);
	var threeDayBefore = twoDayBefore - (60 * 60 * 24);
	var fourDayBefore = threeDayBefore - (60 * 60 * 24);
	var fiveDayBefore = fourDayBefore - (60 * 60 * 24);

	// Weather API call
	var currentWeatherJSON = $.ajax({
		method: 'get',
		// Change API key!!!
		url: 'https://api.forecast.io/forecast/' + ENV['FORECAST'] + '/' + lat + ',' + lng,
		datatype: 'json'
	});



	return 
}

function get_coordinates(location) {
	var city;
	var lat;
	var lng;

	$.ajax({
		method: 'get',
		// Change api key!!!
		url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=YOUR_API_KEY',
		datatype: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			city = data['results'][0]['formatted_address'];
			lat = data['results'][0]['geometry']['location']['lat'];
			lng = data['results'][0]['geometry']['location']['lng'];
		}
	});

	return {
		city: city,
		lat: lat,
		lng: lng
	};
}

function get_weather(lat, lng) {
	var weather;

	$.ajax({
		method: 'get',
		// Change API key!!!
		url: 'https://api.forecast.io/forecast/' + ENV['FORECAST'] + '/' + lat + ',' + lng,
		datatype: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			weather = data;
		}
	});

	return weather;
}



