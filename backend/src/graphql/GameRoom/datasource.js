const { DataSource } = require("apollo-datasource");
const { ApolloError } = require("apollo-server-core");
const mongoose = require("mongoose");

const ChatRoom = require("../../schemas/ChatRoom/ChatRoom");
const Question = require("../../schemas/Question/Question");
const GameRoom = require("../../schemas/GameRoom/GameRoom");

class GameRoomAPI extends DataSource {
  constructor() {
    super();
  }

  async createGameRoom(chatRoomId) {
    try {
      const chatRoom = await ChatRoom.findById(chatRoomId);

      //initiates new gameRoom
      const gameRoomId = new mongoose.Types.ObjectId();
      const gameRoom = new GameRoom({
        _id: gameRoomId,
        questions: [],
      });
      //populates gameRoom with questions
      const questions = await this.getQuestion();
      questions.forEach((ques) => {
        gameRoom.questions.push(ques._id);
      });
      //persists gameRoom
      await gameRoom.save();
      let persistedGameRoom = await GameRoom.findById(gameRoomId);
      //updates chatRoom.gameRoom data
      if (!chatRoom.gameRoom) {
        chatRoom.gameRoom = new GameRoom({
          _id: persistedGameRoom._id,
          questions: persistedGameRoom.questions,
        });
      } else {
        chatRoom.gameRoom._id = persistedGameRoom._id;
        chatRoom.gameRoom.questions = persistedGameRoom.questions;
      }

      //persists chatRoom
      await chatRoom.save();
      let updatedChatRoom = await ChatRoom.findById(chatRoomId);
      return updatedChatRoom.gameRoom.id.toString();
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  //for testing
  async getGameRoomById(gameRoomId) {
    try {
      const gameRoom = await GameRoom.findById(gameRoomId);
      return gameRoom;
    } catch (err) {
      throw new ApolloError("Internal Server Error");
    }
  }

  async getQuestion() {
    try {
      let questions = [];
      const limit = parseInt(process.env.QUESTION_LIMIT) || 10;
      questions = await Question.aggregate([
        {
          $sample: { size: limit },
        },
      ]);
      return questions;
    } catch (err) {
      console.log(err);
      throw new ApolloError("Internal Server Error - get question");
    }
  }
}

module.exports.GameRoomAPI = GameRoomAPI;
