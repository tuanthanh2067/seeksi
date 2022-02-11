const queries = {};

const mutations = {
  sendMatchRequest: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    const fromId = req.user.userId;
    const toId = args.id;

    const result = await dataSources.PotentialMatchAPI.sendMatchRequestTo(
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
