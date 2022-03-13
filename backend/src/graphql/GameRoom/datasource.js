const { DataSource } = require("apollo-datasource");
const { ApolloError, UserInputError } = require("apollo-server-core");
const mongoose = require("mongoose");

const ChatRoom = require("../../schemas/ChatRoom/ChatRoom");
const GameRoom = require("../../schemas/GameRoom/GameRoom");

const GameAnswerEnum = require("../../enum/GameAnswer");

class GameRoomAPI extends DataSource {
  constructor() {
    super();
  }

  async createGameRoom(chatRoomId) {
    try {
      const chatRoom = await ChatRoom.findById(chatRoomId);

      if (chatRoom.gameRoom) {
        throw new UserInputError("You already played this game");
      }

      const _id = mongoose.Types.ObjectId();

      const answers = [
        {
          user: chatRoom.pairID[0],
          answers: new Array(10).fill(GameAnswerEnum.NOT_ANSWERED),
        },
        {
          user: chatRoom.pairID[1],
          answers: new Array(10).fill(GameAnswerEnum.NOT_ANSWERED),
        },
      ];

      // add 10 questions
      const gameRoom = new GameRoom({
        _id,
        answers,
      });

      chatRoom.gameRoom = _id;

      await gameRoom.save();
      await chatRoom.save();

      return _id;
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async submitAnswer(gameRoomId, userId, answers) {
    try {
      const gameRoom = await GameRoom.findById(gameRoomId);

      if (!gameRoom) {
        throw new ApolloError("Game room does not exist");
      }

      const firstUser = gameRoom.answers[0].user.toString();
      const secondUser = gameRoom.answers[1].user.toString();
      // check to see if this user belongs to this game room
      if (firstUser !== userId && secondUser !== userId) {
        throw new ApolloError("Can not submit answers to this game room");
      }

      const index = firstUser === userId ? 0 : 1;

      gameRoom.answers[index].answers = answers;

      await gameRoom.save();
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }
}

module.exports.GameRoomAPI = GameRoomAPI;
