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

  async addPotentialPartners(userId, limit) {
    const _id = mongoose.Types.ObjectId(userId);
    const potentialMatch = await PotentialMatch.findOne({
      user: _id,
    }).populate("user");

    const potentialPartners = Array.from(
      potentialMatch.potentialPartners.keys()
    );
    let query = {
      _id: { $ne: _id },
      isDisabled: { $ne: true },
    };

    if (potentialPartners.length > 0) {
      const lastSearchedUser = potentialPartners[potentialPartners.length - 1];
      query._id.$gt = lastSearchedUser;
    }

    const cursor = User.find(query).sort({ _id: 1 }).cursor();
    for (
      let partner = await cursor.next(), count = 0;
      count < limit && partner != null;
      partner = await cursor.next()
    ) {
      const isCompatible =
        MatchGender.isCompatibleByGenderPreference(
          potentialMatch.user,
          partner
        ) &&
        MatchAge.isCompatibleByAge(potentialMatch.user, partner) &&
        MatchDistance.isCompatibleByDistance(potentialMatch.user, partner);

      if (isCompatible) {
        let partnerStatus;

        const partnerPotMatch = await PotentialMatch.findOne({
          user: { $eq: partner._id },
        }).lean();

        if (partnerPotMatch && partnerPotMatch.potentialPartners.has(userId)) {
          partnerStatus = partnerPotMatch.potentialPartners.get(userId).status;
        } else {
          partnerStatus = MatchStatus.PENDING;
        }

        potentialMatch.potentialPartners.set(partner._id.toString(), {
          userId: partner._id,
          status: MatchStatus.PENDING,
          matchScore: MatchScore.calculateMatchScore({
            user: potentialMatch.user,
            partner,
            partnerStatus,
          }),
        });

        console.log(
          potentialMatch.potentialPartners.get(partner._id.toString())
        );

        count += 1;
      }
    }

    await potentialMatch.save();
  }

  // async createPotentialMatches(size, stats) {
  //   const user = await User.findById(stats.userId);
  //   let count = 0;
  //   let query = {
  //     _id: { $ne: user._id },
  //     isDisabled: { $ne: true },
  //   };

  //   if (stats.prevUserSearch) {
  //     query._id.$gt = stats.prevUserSearch;
  //   }

  //   const cursor = User.find(query).sort({ _id: 1 }).cursor();
  //   for (
  //     let partner = await cursor.next();
  //     count < size && partner != null;
  //     stats.prevUserSearch = partner._id, partner = await cursor.next()
  //   ) {
  //     const pairID = [user._id, partner._id];
  //     const pm = await PotentialMatch.exists({ pairID: { $all: pairID } });

  //     if (pm) {
  //       const isBeforePage = (id) => pm._id < id;
  //       const i = stats.startPairSearch.findIndex(isBeforePage);

  //       if (i > -1) {
  //         stats.startPairSearch[i] = pm._id;
  //       }
  //       continue;
  //     }

  // const isCompatible =
  //   MatchGender.isCompatibleByGenderPreference(user, partner) &&
  //   MatchAge.isCompatibleByAge(user, partner) &&
  //   MatchDistance.isCompatibleByDistance(user, partner);

  //     if (isCompatible) {
  //       const potentialMatch = new PotentialMatch({
  //         pairID,
  //         matchScore: MatchScore.calculateMatchScore({
  //           user,
  //           partner,
  //           partnerStatus: MatchStatus.PENDING,
  //         }),
  //       });
  //       const { _id } = await potentialMatch.save();
  //       const firstPairOfPage = count === 1;
  //       count += 1;
  //       if (firstPairOfPage) {
  //         stats.startPairSearch.push(_id);
  //       }
  //     }
  //   }
  // }

  async filterPotentialPartners(partners, options) {
    return await Promise.all(
      partners.map(async (partner) => {
        const partnerPotMatch = await PotentialMatch.findOne({
          user: { $eq: partner.user._id },
        }).lean();

        if (
          !partnerPotMatch ||
          !partnerPotMatch.potentialPartners.has(options.userId)
        ) {
          return {
            ...partner,
            partnerStatus: MatchStatus.PENDING,
          };
        }

        return {
          ...partner,
          partnerStatus: partnerPotMatch.potentialPartners.get(options.userId)
            .status,
        };
      })
    )
      .filter((partner) => {
        return (
          partner.status === MatchStatus.PENDING &&
          partner.partnerStatus !== MatchStatus.REJECTED
        );
      })
      .slice(options.start, options.start + options.limit);

    // for (
    //   let i = options.start;
    //   count < options.limit && i < partners.length;
    //   i++
    // ) {
    //   let filter = true;

    //   const partnerPotMatch = await PotentialMatch.findOne({
    //     user: { $eq: partners[i].userId },
    //   }).lean();

    //   if (
    //     partnerPotMatch &&
    //     partnerPotMatch.potentialPartners.has(options.userId)
    //   ) {
    //     filter &=
    //       partnerPotMatch.potentialPartners.get(options.userId).status !==
    //       MatchStatus.REJECTED;
    //   }

    //   filter &= partners[i].status === MatchStatus.PENDING;

    //   if (filter) {
    //     const user = await User.findById(partners[i].userId, {
    //       _id: 1,
    //       firstName: 1,
    //       lastName: 1,
    //       bio: 1,
    //       dob: 1,
    //       sex: 1,
    //       location: 1,
    //       hobbies: 1,
    //       avatar: 1,
    //     });

    //     result.push(user);
    //   }
    // }
  }

  async findByUserId(id, page) {
    const limit = process.env.POTENTIAL_PARTNER_LIMIT || 10;
    const start = (page - 1) * limit;
    const populatePartner = async ({ userId, matchScore, status }) => {
      const user = await User.findById(userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
        bio: 1,
        dob: 1,
        sex: 1,
        location: 1,
        hobbies: 1,
        avatar: 1,
      });

      return {
        user,
        matchScore,
        status,
      };
    };

    if (page <= 0) {
      throw new ApolloError("Page must be a positive number");
    }

    const potentialMatch = await PotentialMatch.findOne({
      user: mongoose.Types.ObjectId(id),
    })
      .populate("potentialPartners.$*.userId")
      .lean();
    const potentialPartners = Object.values(potentialMatch.potentialPartners);

    if (potentialPartners.length <= start) {
      await this.addPotentialPartners(id, limit);
    }

    return await filterPotentialPartners(potentialPartners, {
      start,
      limit,
      userId: id,
    });
    //   let stats = await PotentialMatchStats.findOne({ userId: _id });

    //   if (!stats) {
    //     stats = await PotentialMatchStats.create({
    //       userId: _id,
    //     });
    //   }

    //   if (
    //     stats.startPairSearch.length < page ||
    //     stats.startPairSearch[page] == null
    //   ) {
    //     await this.createPotentialMatches(limit, stats);
    //     await stats.save();
    //   }

    //   // FIXME: Query doesn't return already created pairs
    //   return await PotentialMatch.find({
    //     _id: { $gt: stats.startPairSearch[page - 1] },
    //     pairID: { $in: [_id] },
    //     status: { $nin: [MatchStatus.REJECTED] },
    //   })
    //     .populate(
    //       "pairID",
    // `
    // _id
    // firstName
    // lastName
    // bio
    // dob
    // sex
    // location
    // hobbies
    // avatar
    // `
    //     )
    //     .sort({ _id: "asc" })
    //     .limit(limit)
    //     .lean();
  }
}

module.exports.PotentialMatchAPI = PotentialMatchAPI;
