var $ = require("jquery");

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









