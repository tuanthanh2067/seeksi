const { DataSource } = require("apollo-datasource");
const mongoose = require("mongoose");

const PotentialMatch = require("../../schemas/PotentialMatch/PotentialMatch");

const MatchStatus = require("../../enum/MatchStatus");
const { ApolloError } = require("apollo-server-core");

class PotentialMatchAPI extends DataSource {
  constructor() {
    super();
  }

  async isMatched(s1, s2) {
    return s1 === MatchStatus.LIKED && s2 === MatchStatus.LIKED;
  }

  async deleteByUserId(userId) {
    try {
      await PotentialMatch.deleteMany({
        pairID: { $in: [mongoose.Types.ObjectId(userId)] },
      });
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
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

      return potentialMatch;
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async sendRejectRequestTo(fromId, toId) {
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

      potentialMatch.status[index] = MatchStatus.REJECTED;

      await potentialMatch.save();
      return {
        success: true,
        message: "Passed",
      };
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async createPotentialMatches(userId, offset, limit) {
    console.log("Generate new potential matches");
    // const user = await User.findById(userId);
    // If user needs more potential matches:
    // While other_users < 100:
    // Fetch 100 users
    // Find & create potential matches from 100 users
    // Until 25 potential matches are found
    // Stop
  }

  async findByUserId(userId, offset, limit) {
    const query = {
      pairID: { $in: [mongoose.Types.ObjectId(userId)] },
    };
    const options = {
      offset,
      limit,
    };

    const result = await PotentialMatch.paginate(query, options);

    // If no potential match exists, create potential matches
    if (result.totalDocs < limit) {
      // TODO: Implement potential match generation
      this.createPotentialMatches(userId, 0, 0);
    }

    return await PotentialMatch.paginate(query, {
      ...options,
      populate: {
        path: "pairID",
        select: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          bio: 1,
          dob: 1,
          sex: 1,
          location: 1,
          hobbies: 1,
          avatar: 1,
        },
      },
      sort: {
        matchScore: "desc",
      },
      lean: true,
    });
  }
}

module.exports.PotentialMatchAPI = PotentialMatchAPI;
