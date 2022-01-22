const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameQuestionSchema = new Schema({
  questionID: {
    type: String,
    answer: Boolean,
  },
});

module.exports.gameQuestionSchema = gameQuestionSchema;
