const { AuthenticationError, ApolloError } = require("apollo-server-core");

const queries = {
  getQuestion: async (_, __, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);
    return await dataSources.questionAPI.getQuestion();
  },
};

const mutations = {};

module.exports.resolvers = {
  queries,
  mutations,
};
