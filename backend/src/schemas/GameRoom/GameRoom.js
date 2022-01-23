const mongoose = require("mongoose");
const { Schema } = mongoose;

import { gameQuestionSchema } from "./GameQuestion";

const gameRoomSchema = new Schema({
  questions: {
    type: [gameQuestionSchema],
  },
});

const GameRoom = mongoose.model("GameRooms", gameRoomSchema);

module.exports = GameRoom;
