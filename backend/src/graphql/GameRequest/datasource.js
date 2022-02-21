const { DataSource } = require("apollo-datasource");
const mongoose = require("mongoose");

const GameRequest = require("../../schemas/GameRequest/GameRequest");

const { UserInputError, ApolloError } = require("apollo-server-core");

const GameRequestEnum = require("../../enum/GameRequest");

class GameRequestAPI extends DataSource {
  constructor() {
    super();
  }

  async sendGameRequestTo(userId, partnerId) {
    try {
      const pairId = [
        mongoose.Types.ObjectId(userId),
        mongoose.Types.ObjectId(partnerId),
      ];

      // check to see if game request exists
      const existed = await GameRequest.findOne({
        pairID: {
          $all: pairId,
        },
      });

      if (existed) {
        throw new UserInputError("Game request exists");
      }

      const gameRequest = new GameRequest({
        pairID: pairId,

        status: [GameRequestEnum.ACCEPTED, GameRequestEnum.WAITING],
      });

      await gameRequest.save();

      return {
        id: gameRequest.id,
        sentBy: userId,
        sentTo: partnerId,
        createdAt: gameRequest.createdAt,
      };
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async acceptGameRequest(gameRequestId) {
    try {
      const gameRequest = await GameRequest.findById(gameRequestId);

      if (!gameRequest) {
        throw new ApolloError("Game request expired");
      }

      gameRequest.status = [GameRequestEnum.ACCEPTED, GameRequestEnum.ACCEPTED];

      await gameRequest.save();
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async rejectGameRequest(gameRequestId) {
    try {
      await GameRequest.deleteOne({ id: gameRequestId });
    } catch (err) {
      throw new ApolloError("Internal Server Error");
    }
  }
}

module.exports.GameRequestAPI = GameRequestAPI;
