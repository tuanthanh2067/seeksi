const mongoose = require("mongoose");
const { Schema } = mongoose;

const { gameQuestionSchema } = require("./GameAnswer");

const gameRoomSchema = new Schema({
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Questions",
  },
  answers: {
    type: [gameQuestionSchema],
  },
});

const GameRooms = mongoose.model("GameRooms", gameRoomSchema);

module.exports = GameRooms;
module.exports.gameRoomSchema = gameRoomSchema;
