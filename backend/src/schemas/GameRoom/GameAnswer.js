const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameAnswerEnum = require("../../enum/GameAnswer");

const gameAnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  answers: {
    type: [String],
    enum: [GameAnswerEnum.YES, GameAnswerEnum.NO, GameAnswerEnum.NOT_ANSWERED],
  },
  submitted_status: {
    type: Boolean,
    default: false,
  },
});

module.exports.gameAnswerSchema = gameAnswerSchema;
