const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema({
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
});

module.exports.locationSchema = locationSchema;
