const mongoose = require("mongoose");
const { Schema } = mongoose;

const { gameQuestionSchema } = require("./GameQuestion");

const gameRoomSchema = new Schema({
  questions: {
    type: [gameQuestionSchema],
  },
});

module.exports.gameRoomSchema = gameRoomSchema;
