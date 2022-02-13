const { DataSource } = require("apollo-datasource");
const mongoose = require("mongoose");

const PotentialMatch = require("../../schemas/PotentialMatch/PotentialMatch");

const MatchStatus = require("../../enum/MatchStatus");

class PotentialMatchAPI extends DataSource {
  constructor() {
    super();
  }

  async sendMatchRequestTo(fromId, toId) {
    try {
      const pairID = [
        mongoose.Types.ObjectId(fromId),
        mongoose.Types.ObjectId(toId),
      ];
      const potentialMatch = await PotentialMatch.findOne({
        pairID: { $all: pairID },
      });

      const index = potentialMatch.pairID.indexOf(
        `${mongoose.Types.ObjectId(fromId)}`
      );

      potentialMatch.status[index] = MatchStatus.LIKED;

      await potentialMatch.save();
      return {
        success: true,
        message: "Liked",
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: "Internal server error",
      };
    }
  }
}

module.exports.PotentialMatchAPI = PotentialMatchAPI;
