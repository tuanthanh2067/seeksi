const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const MatchStatus = require("../../enum/MatchStatus");

const potentialMatch = new Schema({
  pairID: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  matchScore: {
    type: Number,
  },
  status: {
    type: [String],
    enum: [MatchStatus.PENDING, MatchStatus.LIKED, MatchStatus.REJECTED],
    default: [MatchStatus.PENDING, MatchStatus.PENDING],
  },
});

potentialMatch.plugin(mongoosePaginate);

const PotentialMatch = mongoose.model("PotentialMatches", potentialMatch);

module.exports = PotentialMatch;
