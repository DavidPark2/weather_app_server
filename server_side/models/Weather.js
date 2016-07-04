var mongoose = require('mongoose');

var weatherSchema = new mongoose.Schema({
  location: String,
  lat: Number,
  lng: Number,
  userName: String
});

module.exports = mongoose.model("Weather", WeatherSchema)
