const mongoose = require("mongoose");

const { Schema } = mongoose;

const imageSchema = new Schema({
  origin: {
    type: String,
  },
  small: {
    type: String,
  },
  medium: {
    type: String,
  },
  large: {
    type: String,
  },
});

module.exports.imageSchema = imageSchema;
