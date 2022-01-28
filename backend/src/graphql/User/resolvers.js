const queries = {
  userByEmail: async (_, args, { dataSources }) => {
    return await dataSources.userAPI.findUserByEmail(args.email);
  },
};

const mutations = {
  signup: async (_, args, { dataSources }) => {
    return await dataSources.userAPI.signup({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
      dob: args.dob,
      sex: args.sex,
    });
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
