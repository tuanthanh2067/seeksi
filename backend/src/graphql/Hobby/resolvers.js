const queries = {
  getHobbies: async (_, __, { dataSources }) => {
    return await dataSources.hobbyAPI.getAllHobbies();
  },
};

module.exports.resolvers = {
  queries,
};
