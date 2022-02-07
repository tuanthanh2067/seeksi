const NodeGeocoder = require("node-geocoder");
require("dotenv").config();

const options = {
  provider: "mapquest",

  apiKey: process.env.MAPQUEST_APIKEY,
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
