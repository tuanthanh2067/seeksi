const { AuthenticationError, ApolloError } = require("apollo-server-core");

const queries = {
  getQuestion: async (_, __, { dataSources, req, userAuthentication }) => {
    try {
      userAuthentication(req.user);
      return await dataSources.questionAPI.getQuestion();
    } catch (err) {
      throw new ApolloError(err);
    }
  },
};

const mutations = {};

module.exports.resolvers = {
  queries,
  mutations,
};
