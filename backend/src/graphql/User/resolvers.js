const queries = {
  userByEmail: async (_, args, { dataSources }) => {
    return await dataSources.userAPI.findUser(args.email);
  },
};

const mutations = {
  createUser: (root, args) => {
    const newUser = {
      id: "54321",
      email: args.email,
      password: args.password,
      loggedIn: false,
      firstName: args.firstName,
      lastName: args.lastName,
    };

    return newUser;
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
