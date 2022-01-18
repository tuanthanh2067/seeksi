const queries = {
  user: (root, args) => {
    return {
      id: "12345",
      email: "some.user@email.com",
      password: "Pa$$w0rd!",
      loggedIn: false,
      firstName: "Some",
      lastName: "User",
    };
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
