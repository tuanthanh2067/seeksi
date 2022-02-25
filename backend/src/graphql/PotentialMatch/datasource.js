const { DataSource } = require("apollo-datasource");
const { ApolloError } = require("apollo-server-core");
const mongoose = require("mongoose");

const PotentialMatch = require("../../schemas/PotentialMatch/PotentialMatch");
const PotentialMatchStats = require("../../schemas/PotentialMatch/PotentialMatchStats");
const User = require("../../schemas/User/User");

const { MatchGender } = require("../../../lib/gender");
const { MatchAge } = require("../../../lib/age");
const { MatchDistance } = require("../../../lib/location");
const { MatchScore } = require("../../../lib/score");
const MatchStatus = require("../../enum/MatchStatus");

require("dotenv").config();

class PotentialMatchAPI extends DataSource {
  constructor() {
    super();
  }

  isMatched(s1, s2) {
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

  async createPotentialMatches(size, stats) {
    const user = await User.findById(stats.userId);
    let count = 0;
    let query = {
      _id: { $ne: user._id },
      isDisabled: { $ne: true },
    };

    if (stats.prevUserSearch) {
      query._id.$gt = stats.prevUserSearch;
    }

    const cursor = User.find(query).sort({ _id: 1 }).cursor();
    for (
      let partner = await cursor.next();
      count < size && partner != null;
      stats.prevUserSearch = partner._id, partner = await cursor.next()
    ) {
      const isCompatible =
        MatchGender.isCompatibleByGenderPreference(user, partner) &&
        MatchAge.isCompatibleByAge(user, partner) &&
        MatchDistance.isCompatibleByDistance(user, partner);

      if (isCompatible) {
        const potentialMatch = new PotentialMatch({
          pairID: [user._id, partner._id],
          matchScore: MatchScore.calculateMatchScore({
            user,
            partner,
            partnerStatus: MatchStatus.PENDING,
          }),
        });
        const { _id } = await potentialMatch.save();
        count += 1;
        if (count === 1) {
          stats.startPairSearch.push(_id);
        }
      }
    }
  }

  async findByUserId(userId, page) {
    const _id = mongoose.Types.ObjectId(userId);
    const limit = process.env.POTENTIAL_PARTNER_LIMIT || 10;

    if (page <= 0) {
      throw new ApolloError("Page must be a positive number");
    }

    let stats = await PotentialMatchStats.findOne({ userId: _id });

    if (!stats) {
      stats = await PotentialMatchStats.create({
        userId: _id,
      });
    }

    if (
      stats.startPairSearch.length < page ||
      stats.startPairSearch[page] == null
    ) {
      await this.createPotentialMatches(limit, stats);
      await stats.save();
    }

    return await PotentialMatch.find({
      _id: { $gt: stats.startPairSearch[page - 1] },
      pairID: { $in: [_id] },
      status: { $nin: [MatchStatus.REJECTED] },
    })
      .populate(
        "pairID",
        `
        _id
        firstName
        lastName
        bio
        dob
        sex
        location
        hobbies
        avatar
        `
      )
      .sort({ _id: "asc" })
      .limit(limit)
      .lean();
  }
}

module.exports.PotentialMatchAPI = PotentialMatchAPI;
