const mongoose = require("mongoose");
const { Schema } = mongoose;

const potentialMatchStats = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  lastPage: {
    type: Number,
    default: -1,
  },
  prevUserPage: {
    type: Number,
    default: -1,
  },
  prevCarryOver: {
    type: Number,
    default: 0,
  },
});

// potentialMatch.plugin(mongoosePaginate);

const PotentialMatchStats = mongoose.model(
  "PotentialMatchStats",
  potentialMatchStats
);

module.exports = PotentialMatchStats;
