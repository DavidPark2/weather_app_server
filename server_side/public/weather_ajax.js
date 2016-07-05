var $ = require("jquery");

function get_current_weather(lat, lng) {
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

function get_past_weather(lat, lng) {
	// In Unix Timestamp
	var currentTime = Math.round(new Date().getTime()/1000.0);
	var oneDayBefore = currentTime - (60 * 60 * 24);
	var twoDayBefore = oneDayBefore - (60 * 60 * 24);
	var threeDayBefore = twoDayBefore - (60 * 60 * 24);
	var fourDayBefore = threeDayBefore - (60 * 60 * 24);
	var fiveDayBefore = fourDayBefore - (60 * 60 * 24);

	var oneDayPast;
	var twoDayPast;
	var threeDayPast;
	var fourDayPast;
	var fiveDayPast;

	// yesterday ajax call
	$.ajax({
		method: 'get',
		// Change API key!!!
		url: 'https://api.forecast.io/forecast/' + ENV['FORECAST'] + '/' + lat + ',' + lng + ',' + oneDayBefore,
		datatype: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			oneDayPast = data;
		}
	});

	// 2 days ago ajax call
	$.ajax({
		method: 'get',
		// Change API key!!!
		url: 'https://api.forecast.io/forecast/' + ENV['FORECAST'] + '/' + lat + ',' + lng + ',' + twoDayBefore,
		datatype: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			twoDayPast = data;
		}
	});

	// 3 days ago ajax call
	$.ajax({
		method: 'get',
		// Change API key!!!
		url: 'https://api.forecast.io/forecast/' + ENV['FORECAST'] + '/' + lat + ',' + lng + ',' + threeDayBefore,
		datatype: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			threeDayPast = data;
		}
	});

	// 4 days ago ajax call
	$.ajax({
		method: 'get',
		// Change API key!!!
		url: 'https://api.forecast.io/forecast/' + ENV['FORECAST'] + '/' + lat + ',' + lng + ',' + fourDayBefore,
		datatype: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			fourDayPast = data;
		}
	});

	// 5 days ago ajax call
	$.ajax({
		method: 'get',
		// Change API key!!!
		url: 'https://api.forecast.io/forecast/' + ENV['FORECAST'] + '/' + lat + ',' + lng + ',' + fiveDayBefore,
		datatype: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			fiveDayPast = data;
		}
	});

	return {
		oneDayPast: oneDayPast,
		twoDayPast: twoDayPast,
		threeDayPast: threeDayPast,
		fourDayPast: fourDayPast,
		fiveDayPast: fiveDayPast
	};
}