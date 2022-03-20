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

  /**
   * Initialize a potential match container for a user.
   *
   * Potential partners are saved as a JS Map to
   * allow fast retrieval through their MongoDB ObjectId.
   *
   * @param {String | Object} userId an object or a string representation of a user's MongoDB ObjectId
   * @param {Map} potentialPartners a JS Map of potential partners
   * @returns an object of the created potential match
   */
  async createPotentialMatch(userId, potentialPartners) {
    const _id =
      userId instanceof mongoose.Types.ObjectId
        ? userId
        : mongoose.Types.ObjectId(userId);

    return await PotentialMatch.create({
      user: _id,
      potentialPartners: potentialPartners || new Map(),
    });
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

  isCompatible(user, partner) {
    return (
      MatchGender.isCompatibleByGenderPreference(user, partner) &&
      MatchAge.isCompatibleByAge(user, partner) &&
      MatchDistance.isCompatibleByDistance(user, partner)
    );
  }

  /**
   * Get the filter for a user's potential partners.
   *
   * This filter is designed to be passed to `User.find()`
   * as the `filter` parameter (first parameter). Available
   * `options` are:
   * - `potentialPartners`: a list of existing potential partners
   * - `userId`: the MongoDB ObjectId of the user
   *
   * @param {Object} options a set of filter options
   * @returns an object that matches the `User` schema
   */
  buildQuery(options) {
    const { potentialPartners, userId } = options;

    if (Array.isArray(potentialPartners) && potentialPartners.length > 0) {
      const lastSearchedUser = potentialPartners[potentialPartners.length - 1];

      return {
        _id: { $ne: userId, $gt: lastSearchedUser },
        isDisabled: { $ne: true },
      };
    }

    return {
      _id: { $ne: userId },
      isDisabled: { $ne: true },
    };
  }

  /**
   * Get the match status of a potential partner towards a user.
   *
   * If the status can't be found, it assumes that the user has
   * not been detected as one of the partner's potential partners.
   *
   * @param {String} userId the string representation of a user's MongoDB ObjectId
   * @param {Object} partnerId a partner's MongoDB ObjectId
   * @returns the status of the partner towards the user
   */
  async getPartnerStatus(userId, partnerId) {
    const potentialMatch = await PotentialMatch.findOne({
      user: { $eq: partnerId },
    });

    if (
      potentialMatch &&
      potentialMatch.potentialPartners instanceof Map &&
      potentialMatch.potentialPartners.has(userId)
    ) {
      return partnerPotMatch.potentialPartners.get(userId).status;
    }

    return MatchStatus.PENDING;
  }

  /**
   * Find the next potential partners from the User collection.
   *
   * @param {String} userId the string representation of a user's MongoDB ObjectId
   * @param {Number} limit the number of potential partners needed
   * @returns a JS Map of potential partners & their IDs
   */
  async nextPotentialPartners(userId, limit) {
    const _id = mongoose.Types.ObjectId(userId);
    const potentialMatch = await PotentialMatch.findOne({
      user: _id,
    })
      .populate("user")
      .populate("potentialPartners.$*.partner");

    const potentialPartners = Array.from(
      potentialMatch.potentialPartners.keys()
    );
    const query = this.buildQuery({ potentialPartners, userId: _id });

    const cursor = User.find(query).sort({ _id: 1 }).cursor();
    for (
      let partner = await cursor.next(), count = 0;
      count < limit && partner != null;
      partner = await cursor.next()
    ) {
      if (this.isCompatible(potentialMatch.user, partner)) {
        const partnerStatus = await this.getPartnerStatus(
          potentialMatch.user._id,
          partner._id
        );

        potentialMatch.potentialPartners.set(partner._id.toString(), {
          partner: partner._id,
          status: MatchStatus.PENDING,
          matchScore: MatchScore.calculateMatchScore({
            user: potentialMatch.user,
            partner,
            partnerStatus,
          }),
        });

        count += 1;
      }
    }

    return potentialMatch.potentialPartners;
  }

  async getPotentialMatch(userId) {
    const _id =
      userId instanceof mongoose.Types.ObjectId
        ? userId
        : mongoose.Types.ObjectId(userId);
    const potentialMatch = await PotentialMatch.findOne({
      user: _id,
    });

    if (!potentialMatch) {
      return await this.createPotentialMatch(_id);
    }

    return potentialMatch;
  }

  /**
   * Get a list of filtered potential partners.
   *
   * Some of the `options` of the filter are:
   * - `start`: the page to start the search
   * - `limit`: the number of the returned potential partners
   *
   * @param {Object} potentialMatch a user's potential match container
   * @param {Object} options a set of options for the filter
   * @returns a JS array of potential partners with necessary details
   */
  async filterPotentialPartners(potentialMatch, options) {
    let count = 0;
    let results = [];

    if (
      !potentialMatch.potentialPartners ||
      !(potentialMatch.potentialPartners instanceof Map)
    ) {
      throw new Error("Potential partners aren't stored correctly!");
    }

    const all = Array.from(potentialMatch.potentialPartners.values());

    for (let i = options.start; count < options.limit && i < all.length; i++) {
      const status = await this.getPartnerStatus(
        potentialMatch.user,
        all[i].partner
      );

      if (
        all[i].status !== MatchStatus.PENDING ||
        status === MatchStatus.REJECTED
      ) {
        continue;
      }

      const user = await User.findById(potentialMatch.user);
      const partner = await User.findById(all[i].partner, {
        avatar: 1,
        firstName: 1,
        lastName: 1,
        bio: 1,
        sex: 1,
        location: 1,
        dob: 1,
        hobbies: 1,
      }).lean();

      const id = partner._id.toString();
      const age = MatchAge.calculateAge(partner.dob.toISOString());
      const distance = MatchDistance.calculateDistance(user, partner);

      results.push({
        id,
        distance,
        age,
        status,
        matchScore: all[i].matchScore,
        avatar: partner.avatar,
        firstName: partner.firstName,
        lastName: partner.lastName,
        bio: partner.bio,
        sex: partner.sex,
        hobbies: partner.hobbies,
      });

      count++;
    }

    return await Promise.all(results);
  }

  async getPotentialPartners(userId, options) {
    const potentialMatch = await this.getPotentialMatch(userId);

    if (potentialMatch.potentialPartners.size <= options.start) {
      potentialMatch.potentialPartners = await this.nextPotentialPartners(
        userId,
        options.limit
      );
      await potentialMatch.save();

      return await this.filterPotentialPartners(potentialMatch, options);
    }

    return await this.filterPotentialPartners(potentialMatch, options);
  }

  async findByUserId(id, page) {
    const limit = process.env.POTENTIAL_PARTNER_LIMIT || 10;
    const start = (page - 1) * limit;
    const options = {
      start,
      limit,
    };

    if (page <= 0) {
      throw new ApolloError("Page must be a positive number");
    }

    return await this.getPotentialPartners(id, options);
  }
}

module.exports.PotentialMatchAPI = PotentialMatchAPI;
