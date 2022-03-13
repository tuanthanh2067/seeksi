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

      const id = mongoose.Types.ObjectId();

      const gameRoom = new GameRoom({
        _id: id,
        questions: [],
      });
      //populates gameRoom with questions
      const questions = await this.getQuestion();
      questions.forEach((ques) => {
        gameRoom.questions.push(ques._id);
      });

      chatRoom.gameRoom = gameRoom._id;

      //persists gameRoom and chatRoom
      gameRoom.save();
      chatRoom.save();

      return id;
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
