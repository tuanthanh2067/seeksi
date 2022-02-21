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
    enum: [GameRequestEnum.WAITING, GameRequestEnum.ACCEPTED],
    default: [GameRequestEnum.WAITING, GameRequestEnum.WAITING],
  },

  createdAt: {
    type: Date,
    // expire in 30 mins
    expires: 1800,
    default: Date.now,
  },
});

const GameRequest = mongoose.model("GameRequests", gameRequestSchema);

module.exports = GameRequest;
