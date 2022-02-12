const queries = {};

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
        await dataSources.PotentialMatchAPI.sendMatchRequestTo(fromId, toId);

      if (
        dataSources.PotentialMatchAPI.isMatched(
          potentialMatch.status[0],
          potentialMatch.status[1]
        )
      ) {
        const userId = potentialMatch.pairID[0].toString();
        const partnerId = potentialMatch.pairID[1].toString();

        // create a chat room
        const { id } = await dataSources.ChatRoomAPI.createChatRoom(
          userId,
          partnerId
        );

        // create a match
        await dataSources.MatchAPI.createMatch(userId, partnerId, id);

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
    userAuthentication(req.user);

    const fromId = req.user.userId;
    const toId = args.id;

    const result = await dataSources.PotentialMatchAPI.sendRejectRequestTo(
      fromId,
      toId
    );

    return result;
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
