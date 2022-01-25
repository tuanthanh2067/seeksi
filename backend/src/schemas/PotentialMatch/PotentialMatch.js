const mongoose = require("mongoose");
const { Schema } = mongoose;

const potentialMatch = new Schema({
  pairID: {
    type: [String],
  },
  matchScore: {
    type: Number,
  },
  status: {
    type: [String],
  },
});

const PotentialMatch = mongoose.model("PotentialMatches", potentialMatch);

module.exports = PotentialMatch;