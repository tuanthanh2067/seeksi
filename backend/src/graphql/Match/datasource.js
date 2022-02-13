const { DataSource } = require("apollo-datasource");
const { ApolloError } = require("apollo-server-core");

const mongoose = require("mongoose");

const Match = require("../../schemas/Match/Match");

class MatchAPI extends DataSource {
  constructor() {
    super();
  }

  async createMatch(userId, partnerId, roomId) {
    try {
      const user = mongoose.Types.ObjectId(userId);
      const partner = mongoose.Types.ObjectId(partnerId);
      const room = mongoose.Types.ObjectId(roomId);

      const match = new Match({
        pairID: [user, partner],
        roomId: room,
      });

      await match.save();

      return;
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }
}

module.exports.MatchAPI = MatchAPI;
