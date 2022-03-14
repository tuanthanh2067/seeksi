const { AuthenticationError, ApolloError } = require("apollo-server-core");

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
  createGameRoom: async (
    _,
    { chatRoomId },
    { dataSources, req, userAuthentication }
  ) => {
    try {
      userAuthentication(req.user);
      const id = await dataSources.gameRoomAPI.createGameRoom(chatRoomId);
      if (id) {
        return {
          success: true,
          message: id,
        };
      }
    } catch (err) {
      throw new ApolloError(err);
    }
  },
};

const queries = {};

const subscriptions = {};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
