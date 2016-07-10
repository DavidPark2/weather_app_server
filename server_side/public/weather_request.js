var request = require('request');
var deasync = require('deasync');

var api = process.env.MAPS_KEY;
var forecastAPI = process.env.FORECAST;

module.exports.get_current_weather = function(lats, lngs) {
	var location;
	var oneYearPast;
	var twoYearPast;
	var threeYearPast;
	var fourYearPast;
	var fiveYearPast;

	var currentTime = Math.round(new Date().getTime()/1000.0);
	var oneYearBefore = currentTime - (60 * 60 * 24 * 365);
	var twoYearBefore = oneYearBefore - (60 * 60 * 24 * 365);
	var threeYearBefore = twoYearBefore - (60 * 60 * 24 * 365);
	var fourYearBefore = threeYearBefore - (60 * 60 * 24 * 365);
	var fiveYearBefore = fourYearBefore - (60 * 60 * 24 * 365);

	// current http request
	request.get('https://api.forecast.io/forecast/' + forecastAPI + '/' + lats + ',' + lngs, function (err, res, body) {
		location = JSON.parse(body);
	})
	// one year ago http request
	request.get('https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lats + ',' + lngs + ',' + oneYearBefore, function (err, res, body) {
		oneYearPast = JSON.parse(body);
	})
	// 2 years ago http request
	request.get('https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lats + ',' + lngs + ',' + twoYearBefore, function (err, res, body) {
		twoYearPast = JSON.parse(body);
	})
	// 3 years ago http request
	request.get('https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lats + ',' + lngs + ',' + threeYearBefore, function (err, res, body) {
		threeYearPast = JSON.parse(body);
	})
	// 4 years ago http request
	request.get('https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lats + ',' + lngs + ',' + fourYearBefore, function (err, res, body) {
		fourYearPast = JSON.parse(body);
	})
	// 5 years ago http request
	request.get('https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lats + ',' + lngs + ',' + fiveYearBefore, function (err, res, body) {
		fiveYearPast = JSON.parse(body);
	})
	while(location === undefined) {
		deasync.runLoopOnce();
	}
	while(oneYearPast === undefined) {
		deasync.runLoopOnce();
	}
	while(twoYearPast === undefined) {
		deasync.runLoopOnce();
	}
	while(threeYearPast === undefined) {
		deasync.runLoopOnce();
	}
	while(fourYearPast === undefined) {
		deasync.runLoopOnce();
	}
	while(fiveYearPast === undefined) {
		deasync.runLoopOnce();
	}
	return {current: location,
			one: oneYearPast,
			two: twoYearPast,
			three: threeYearPast,
			four: fourYearPast,
			five: fiveYearPast
	};
}





// 	get_past_weather: function (lat, lng) {
// 		// yesterday ajax call
// 		$.ajax({
// 			method: 'get',
// 			// Change API key!!!
// 			url: 'https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lat + ',' + lng + ',' + oneYearBefore,
// 			datatype: 'json',
// 			async: false,
// 			success: function(data) {
// 				console.log(data);
// 				oneYearPast = data;
// 			}
// 		});

// 		// 2 days ago ajax call
// 		$.ajax({
// 			method: 'get',
// 			// Change API key!!!
// 			url: 'https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lat + ',' + lng + ',' + twoYearBefore,
// 			datatype: 'json',
// 			async: false,
// 			success: function(data) {
// 				console.log(data);
// 				twoYearPast = data;
// 			}
// 		});

// 		// 3 days ago ajax call
// 		$.ajax({
// 			method: 'get',
// 			// Change API key!!!
// 			url: 'https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lat + ',' + lng + ',' + threeYearBefore,
// 			datatype: 'json',
// 			async: false,
// 			success: function(data) {
// 				console.log(data);
// 				threeYearPast = data;
// 			}
// 		});

// 		// 4 days ago ajax call
// 		$.ajax({
// 			method: 'get',
// 			// Change API key!!!
// 			url: 'https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lat + ',' + lng + ',' + fourYearBefore,
// 			datatype: 'json',
// 			async: false,
// 			success: function(data) {
// 				console.log(data);
// 				fourYearPast = data;
// 			}
// 		});

// 		// 5 days ago ajax call
// 		$.ajax({
// 			method: 'get',
// 			// Change API key!!!
// 			url: 'https://api.forecast.io/forecast/' + process.env.FORECAST + '/' + lat + ',' + lng + ',' + fiveYearBefore,
// 			datatype: 'json',
// 			async: false,
// 			success: function(data) {
// 				console.log(data);
// 				fiveYearPast = data;
// 			}
// 		});

// 		return {
// 			oneYearPast: oneYearPast,
// 			twoYearPast: twoYearPast,
// 			threeYearPast: threeYearPast,
// 			fourYearPast: fourYearPast,
// 			fiveYearPast: fiveYearPast
// 		};
// 	}
// }


