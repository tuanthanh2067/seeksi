const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameQuestionSchema = new Schema({
  answer: {
    type: Boolean,
  },
});

module.exports.gameQuestionSchema = gameQuestionSchema;
