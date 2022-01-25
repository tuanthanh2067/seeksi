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
    type: Number,
  },
  latitude: {
    type: Number,
  },
});

module.exports.locationSchema = locationSchema;
