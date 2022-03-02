const mongoose = require("mongoose");
const { Schema } = mongoose;

const MatchStatus = require("../../enum/MatchStatus");

const potentialPartnerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    matchScore: {
      type: Number,
    },
    status: {
      type: String,
      enum: [MatchStatus.PENDING, MatchStatus.LIKED, MatchStatus.REJECTED],
      default: MatchStatus.PENDING,
    },
  },
  { _id: false }
);

module.exports = potentialPartnerSchema;
