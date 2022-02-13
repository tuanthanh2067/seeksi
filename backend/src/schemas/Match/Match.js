const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  pairID: {
    type: [Schema.Types.ObjectId],
    ref: "Users",
  },
  isUnmatched: {
    type: Boolean,
    default: false,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "ChatRooms",
  },
});

const Match = mongoose.model("Matches", matchSchema);

module.exports = Match;
