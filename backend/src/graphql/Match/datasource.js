const { DataSource } = require("apollo-datasource");
const { ApolloError } = require("apollo-server-core");
const { ObjectId } = require("mongoose").Types;

const Match = require("../../schemas/Match/Match");

class MatchAPI extends DataSource {
  constructor() {
    super();
  }

  async createMatch(userId, partnerId, roomId) {
    try {
      const user = ObjectId(userId);
      const partner = ObjectId(partnerId);
      const room = ObjectId(roomId);

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
    const pairID = [ObjectId(userId), ObjectId(partnerId)];

    const match = await Match.findOne({ pairID: { $all: pairID } });

    if (!match) {
      throw new ApolloError("Match can't be found!");
    }

    match.isUnmatched = true;

    await match.save();
  }
}

module.exports.MatchAPI = MatchAPI;
