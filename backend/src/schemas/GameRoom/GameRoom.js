const mongoose = require("mongoose");
const { Schema } = mongoose;

const { gameAnswerSchema } = require("./GameAnswer");

const gameRoom = new Schema({
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Questions",
  },
  answers: [gameAnswerSchema],
});

const GameRoom = mongoose.model("GameRooms", gameRoom);

module.exports = GameRoom;
