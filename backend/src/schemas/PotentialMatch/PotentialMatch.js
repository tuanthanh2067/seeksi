const mongoose = require("mongoose");
const { Schema } = mongoose;

const MatchStatus = require("../../enum/MatchStatus");

const potentialMatch = new Schema({
  pairID: {
    type: [Schema.Types.ObjectId],
    ref: "Users",
  },
  matchScore: {
    type: Number,
  },
  status: {
    type: [String],
    enum: [MatchStatus.PENDING, MatchStatus.LIKED, MatchStatus.REJECTED],
    default: MatchStatus.PENDING,
  },
});

const PotentialMatch = mongoose.model("PotentialMatches", potentialMatch);

module.exports = PotentialMatch;
