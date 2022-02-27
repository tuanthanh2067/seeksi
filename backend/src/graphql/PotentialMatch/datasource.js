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

  async createPotentialMatches(userId, size, stats) {
    let hasNextPage = true;
    let count = stats.prevCarryOver;
    const user = await User.findById(userId);

    while (hasNextPage && count < size) {
      stats.prevUserPage += 1;

      const options = {
        page: stats.prevUserPage,
        limit: size,
      };

      const result = await User.paginate(
        {
          _id: { $ne: user._id },
          isDisabled: { $ne: true },
        },
        options
      );

      for (const partner of result.docs) {
        const matchAlreadyExists = await PotentialMatch.exists({
          pairID: { $all: [user._id, partner._id] },
        });

        if (matchAlreadyExists) {
          continue;
        }

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

          await potentialMatch.save();

          count += 1;
        }
      }

      hasNextPage = result.hasNextPage;
    }

    stats.prevCarryOver = count - size;
  }

  async findByUserId(userId, page) {
    const _id = mongoose.Types.ObjectId(userId);
    const limit = process.env.POTENTIAL_PARTNER_LIMIT || 10;
    const query = {
      pairID: { $in: [_id] },
      status: { $nin: [MatchStatus.REJECTED] },
    };
    const options = {
      page,
      limit,
    };

    let stats = await PotentialMatchStats.findOne({ userId: _id });

    if (!stats) {
      stats = await PotentialMatchStats.create({
        userId: _id,
      });
    }

    if (stats.lastPage < page) {
      await this.createPotentialMatches(userId, limit, stats);
      stats.lastPage = page;
      await stats.save();
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
    });
  }
}

module.exports.PotentialMatchAPI = PotentialMatchAPI;
