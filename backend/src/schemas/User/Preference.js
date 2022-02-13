const mongoose = require("mongoose");
const { Schema } = mongoose;

const { MatchGender } = require("../../enum/MatchGender");

const preferenceSchema = new Schema({
  gender: {
    type: String,
    enum: [MatchGender.MALE, MatchGender.FEMALE, MatchGender.EVERYONE],
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
