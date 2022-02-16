const { DataSource } = require("apollo-datasource");
const { ApolloError } = require("apollo-server-core");

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
      throw new ApolloError("Internal Server Error");
    }
  }

  async getChatRoomById(roomId) {
    try {
      const chatRoom = await ChatRoom.findById(roomId).exec();

      if (!chatRoom) {
        throw new ApolloError("Can not find chat room");
      }

      return chatRoom;
    } catch (err) {
      console.log(err);
      throw new ApolloError("Internal Server Error");
    }
  }
}

module.exports.ChatRoomAPI = ChatRoomAPI;
