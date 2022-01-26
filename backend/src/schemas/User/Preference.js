const mongoose = require("mongoose");

const { Schema } = mongoose;

const preferenceSchema = new Schema({
  gender: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  minAge: {
    type: Number,
  },
  maxAge: {
    type: Number,
  },
  longTerm: {
    type: Boolean,
  },
  shortTerm: {
    type: Boolean,
  },
});

module.exports.preferenceSchema = preferenceSchema;
