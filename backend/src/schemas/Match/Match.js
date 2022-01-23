const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  pairID: {
    type: [String],
  },
  isUnmatched: {
    type: Boolean,
  },
  roomId: {
    type: String,
  },
});

const Match = mongoose.model("Matches", matchSchema);

module.exports = Match;
