const { DataSource } = require("apollo-datasource");

const mongoose = require("mongoose");

const ChatRoom = require("../../schemas/ChatRoom/ChatRoom");

class ChatRoomAPI extends DataSource {
  constructor() {
    super();
  }

  async createChatRoom(userId, partnerId) {
    try {
      const user = mongoose.Types.ObjectId(userId);
      const partner = mongoose.Types.ObjectId(partnerId);

      const chatRoom = new ChatRoom({
        pairID: [user, partner],
      });

      await chatRoom.save();

      return {
        id: chatRoom.id,
      };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports.ChatRoomAPI = ChatRoomAPI;
