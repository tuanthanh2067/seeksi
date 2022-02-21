const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameRequestEnum = require("../../enum/GameRequest");

const gameRequestSchema = new Schema({
  pairID: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  ],

  status: {
    type: [String],
    enum: [GameRequestEnum.ACCEPTED, GameRequestEnum.WAITING],
    default: [GameRequestEnum.WAITING, GameRequestEnum.WAITING],
  },

  createdAt: {
    type: Date,
    // expire in 10 mins
    expires: 600,
    default: Date.now,
  },
});

const GameRequest = mongoose.model("GameRequests", gameRequestSchema);

module.exports = GameRequest;
