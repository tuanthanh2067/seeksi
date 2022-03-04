const queries = {};

const mutations = {
  unmatch: async (_, { id }, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    await dataSources.matchAPI.unmatch(req.user.userId, id);

    await dataSources.chatRoomAPI.disableByUserId(req.user.userId, id);

    return {
      success: true,
      message: "Unmatched!",
    };
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
