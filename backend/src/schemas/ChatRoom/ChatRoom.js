const mongoose = require("mongoose");

const { Schema } = mongoose;

const { messageHistorySchema } = require("./MessageHistory");

const { gameRoomSchema } = require("../GameRoom/GameRoom");

const chatRoomSchema = new Schema({
  pairID: {
    type: [Schema.Types.ObjectId],
    ref: "Users",
  },
  history: {
    type: messageHistorySchema,
  },
  gameRoom: {
    type: gameRoomSchema,
    default: null,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const ChatRooms = mongoose.model("ChatRooms", chatRoomSchema);

module.exports = ChatRooms;
