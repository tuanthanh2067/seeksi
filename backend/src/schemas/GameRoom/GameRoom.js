const mongoose = require("mongoose");
const { Schema } = mongoose;

const { gameAnswerSchema } = require("./GameAnswer");

const gameRoomSchema = new Schema({
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Questions",
  },
  answers: {
    type: [gameAnswerSchema],
    default: null,
  },
});

const GameRooms = mongoose.model("GameRooms", gameRoomSchema);

module.exports = GameRooms;
module.exports.gameRoomSchema = gameRoomSchema;
