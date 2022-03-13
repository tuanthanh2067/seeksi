const queries = {};

const mutations = {
  submitAnswers: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

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
