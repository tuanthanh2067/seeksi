const mongoose = require("mongoose");
const { Schema } = mongoose;

const potentialMatchStats = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  startPairSearch: {
    type: [Schema.Types.ObjectId],
    ref: "Users",
  },
  prevUserSearch: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

const PotentialMatchStats = mongoose.model(
  "PotentialMatchStats",
  potentialMatchStats
);

module.exports = PotentialMatchStats;
