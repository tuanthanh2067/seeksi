const { AuthenticationError, ApolloError } = require("apollo-server-core");

const queries = {
    getOpeningLine: async (_, __, { dataSources, req, userAuthentication }) => {
        try {
            userAuthentication(req.user);
            return await dataSources.openingLineAPI.getOpeningLine();
        } catch (err) {
            throw new ApolloError(err);
        }
    }
};

const mutations = {
    incrementUseCount: async (_, { lineId }, { dataSources, req, userAuthentication }) => {
        try {
            userAuthentication(req.user);
            let updatedLine = await dataSources.openingLineAPI.incrementUseCount(lineId);
            if (updatedLine) {
                return {
                    success: true,
                    message: "UseCount is updated"
                }
            }
        } catch (err) {
            throw new ApolloError(err);
        }
    }
};

module.exports.resolvers = {
    queries,
    mutations,
};
