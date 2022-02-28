const mongoose = require("mongoose");
const { Schema } = mongoose;

const { gameAnswerSchema } = require("./GameAnswer");

const gameRoom = new Schema({
  pairID: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Questions",
  },
  answers: [gameAnswerSchema],
});

const GameRoom = mongoose.model("GameRooms", gameRoom);

module.exports = GameRoom;
