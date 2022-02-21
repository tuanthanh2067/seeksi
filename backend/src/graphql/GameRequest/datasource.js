const { DataSource } = require("apollo-datasource");
const mongoose = require("mongoose");

const GameRequest = require("../../schemas/GameRequest/GameRequest");

const GameRequestEnum = require("../../enum/GameRequest");

class GameRequestAPI extends DataSource {
  constructor() {
    super();
  }

  async sendGameRequestTo(userId, partnerId) {
    const gameRequest = new GameRequest({
      pairID: [
        mongoose.Types.ObjectId(userId),
        mongoose.Types.ObjectId(partnerId),
      ],

      status: [GameRequestEnum.ACCEPTED, GameRequestEnum.WAITING],
    });

    await gameRequest.save();

    return {
      sentBy: userId,
      sentTo: partnerId,
      createdAt: gameRequest.createdAt,
    };
  }
}

module.exports.GameRequestAPI = GameRequestAPI;
