const queries = {
  getGameRoom: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    // check to see if the user belongs to the game room
    await dataSources.gameRoomAPI.checkUserOfGameRoom(
      args.gameRoomId,
      req.user.userId
    );

    return await dataSources.gameRoomAPI.getGameRoom(args.gameRoomId);
  },
};

const mutations = {
  submitAnswers: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    await dataSources.gameRoomAPI.checkUserOfGameRoom(
      args.gameRoomId,
      req.user.userId
    );

    await dataSources.gameRoomAPI.submitAnswer(
      args.gameRoomId,
      req.user.userId,
      args.answers
    );

    return {
      success: true,
      message: "Submit successfully",
    };
  },
};

const subscriptions = {};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
