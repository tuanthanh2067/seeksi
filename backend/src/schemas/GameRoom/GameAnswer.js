const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameAnswerSchema = new Schema({
  answer: {
    type: Boolean,
  },
});

module.exports.gameAnswerSchema = gameAnswerSchema;
