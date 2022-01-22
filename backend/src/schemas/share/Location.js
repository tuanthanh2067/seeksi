const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema({
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
});

module.exports.locationSchema = locationSchema;
