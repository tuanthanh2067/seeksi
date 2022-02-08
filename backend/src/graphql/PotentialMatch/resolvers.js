const { distanceTo } = require("geolocation-utils");

const MatchStatus = require("../../enum/MatchStatus");
const { MatchAge } = require("../../../lib/age");

const queries = {
  getPotentialPartners: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    const { userId } = req.user;
    const { offset, limit } = args;
    const { docs } = await dataSources.PotentialMatchAPI.findByUserId(
      userId,
      offset,
      limit
    );

    const findPartnerIndex = (match) => {
      const userIndex = match.pairID.findIndex(
        (user) => user._id.toString() === userId
      );

      return 1 - userIndex;
    };
    const getPartnerCardInfo = (match) => {
      const partnerIndex = findPartnerIndex(match);
      const user = match.pairID[1 - partnerIndex];
      let partner = match.pairID[partnerIndex];

      partner.id = partner._id;
      partner.age = MatchAge.calculateAge(partner.dob.toISOString());
      partner.distance = Math.ceil(
        distanceTo(
          { lat: user.location.latitude, lon: user.location.longitude },
          { lat: partner.location.latitude, lon: partner.location.longitude }
        ) / 1000
      );

      delete partner._id;
      delete partner.dob;
      delete partner.location;

      return partner;
    };
    const isRejectedPair = (match) =>
      !match.status.includes(MatchStatus.REJECTED);
    const isLikedByPartner = (match) => {
      const partnerIndex = findPartnerIndex(match);

      return match.status[partnerIndex] === MatchStatus.LIKED ? 1 : -1;
    };

    const potentialPartners = docs
      .filter(isRejectedPair)
      .sort(isLikedByPartner)
      .map(getPartnerCardInfo);

    return potentialPartners;
  },
};

const mutations = {
  sendMatchRequest: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    try {
      userAuthentication(req.user);

      const fromId = req.user.userId;
      const toId = args.id;

      const potentialMatch =
        await dataSources.potentialMatchAPI.sendMatchRequestTo(fromId, toId);

      if (
        dataSources.potentialMatchAPI.isMatched(
          potentialMatch.status[0],
          potentialMatch.status[1]
        )
      ) {
        const userId = potentialMatch.pairID[0].toString();
        const partnerId = potentialMatch.pairID[1].toString();

        // create a chat room
        const { id } = await dataSources.chatRoomAPI.createChatRoom(
          userId,
          partnerId
        );

        // create a match
        await dataSources.matchAPI.createMatch(userId, partnerId, id);

        return {
          success: true,
          message: "Matched",
        };
      }

      return {
        success: true,
        message: "Liked",
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  sendRejectRequest: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    try {
      userAuthentication(req.user);

      const fromId = req.user.userId;
      const toId = args.id;

      const result = await dataSources.potentialMatchAPI.sendRejectRequestTo(
        fromId,
        toId
      );

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
