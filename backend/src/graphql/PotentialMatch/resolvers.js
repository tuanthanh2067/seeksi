const queries = {
  getPotentialPartners: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    const { userId } = req.user;
    const { page } = args;
    const docs = await dataSources.potentialMatchAPI.findByUserId(userId, page);

    const isLikedByPartner = (first, second) => {
      return first.status.localeCompare(second.status);
    };
    const byMatchScore = (first, second) => {
      return second.matchScore - first.matchScore;
    };

    return docs.sort(byMatchScore).sort(isLikedByPartner);
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

      await dataSources.potentialMatchAPI.sendMatchRequestTo(fromId, toId);

      const isMatched = await dataSources.potentialMatchAPI.isMatched(
        fromId,
        toId
      );

      if (isMatched) {
        // create a chat room
        const { id } = await dataSources.chatRoomAPI.createChatRoom(
          fromId,
          toId
        );

        // create a match
        await dataSources.matchAPI.createMatch(fromId, toId, id);

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

      await dataSources.potentialMatchAPI.sendRejectRequestTo(fromId, toId);

      return {
        success: true,
        message: "Passed",
      };
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
