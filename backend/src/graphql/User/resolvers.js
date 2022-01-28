const queries = {
  userByEmail: async (_, args, { dataSources }) => {
    return await dataSources.userAPI.findUserByEmail(args.email);
  },
};

const mutations = {
  createUser: async (_, args, { dataSources }) => {
    return await dataSources.userAPI.createUser({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
      dob: "Sun Dec 17 1995 03:24:00 GMT",
      sex: "male",
    });
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
