const { AuthenticationError } = require("apollo-server-core");

const queries = {};

const mutations = {
  sendMatchRequest: async (_, args, { dataSources, req, isAuthenticated }) => {
    if (isAuthenticated(req.user)) {
        
    }
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
