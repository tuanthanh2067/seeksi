const mongoose = require("mongoose");

const { Schema } = mongoose;

const { messageHistorySchema } = require("./MessageHistory");

const chatRoomSchema = new Schema({
  roomID: {
    type: String,
    unique: true,
  },
  pairID: {
    type: [String],
  },
  history: {
    type: messageHistorySchema,
  },
  gameRoom: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
  },
});

const ChatRooms = mongoose.model("ChatRooms", chatRoomSchema);

module.exports = ChatRooms;
