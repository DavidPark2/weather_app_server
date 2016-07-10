var mongoose = require('mongoose');

var weatherSchema = new mongoose.Schema({
  location: String,
  lat: Number,
  lng: Number,
  email: String,
  created_at: Date
});

module.exports = mongoose.model("Weather", weatherSchema)
