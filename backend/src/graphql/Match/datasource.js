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
        roomID: room,
      });

      await match.save();

      return;
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async unmatch(userId, partnerId) {
    const pairID = [
      mongoose.Types.ObjectId(userId),
      mongoose.Types.ObjectId(partnerId),
    ];

    const match = await Match.findOne({ pairID: { $all: pairID } });

    if (!match) {
      throw new ApolloError("Match can't be found!");
    }

    match.isUnmatched = true;

    await match.save();
  }
}

module.exports.MatchAPI = MatchAPI;
