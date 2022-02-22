const { DataSource } = require("apollo-datasource");
const { ApolloError } = require("apollo-server-core");
const mongoose = require("mongoose");

const ChatRoom = require("../../schemas/ChatRoom/ChatRoom");

class GameRoomAPI extends DataSource {
  constructor() {
    super();
  }

  async createGameRoom(chatRoomId) {
    try {
      const chatRoom = await ChatRoom.findById(chatRoomId);

      const id = mongoose.Types.ObjectId();

      const gameRoom = { _id: id };

      chatRoom.gameRoom = gameRoom;
      chatRoom.save();

      return id;
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }
}

module.exports.GameRoomAPI = GameRoomAPI;
