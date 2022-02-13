const { AuthenticationError } = require("apollo-server-core");

const queries = {
  userByEmail: async (_, args, { dataSources }) => {
    return await dataSources.userAPI.findUserByEmail(args.email);
  },

  me: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);
    return await dataSources.userAPI.findUserByEmail(req.user.email);
  },

  //returns user profile identified by the provided userId
  userById: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);
    return dataSources.userAPI.getUserProfileById(args.userId);
  },
};

const mutations = {
  signup: async (_, args, { dataSources }) => {
    const token = await dataSources.userAPI.signup({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
      dob: args.dob,
      sex: args.sex,
    });
    return {
      token: token,
    };
  },

  //login resolver ,takes user email and password
  login: async (_, args, { dataSources }) => {
    const token = await dataSources.userAPI.login(args.email, args.password);
    return {
      token: token,
    };
  },

  setLocation: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    const user = await dataSources.userAPI.setUserLocation(
      args,
      req.user.userId
    );

    return user;
  },

  deleteAccount: async (_, args, { dataSources, req, userAuthentication }) => {
    try {
      userAuthentication(req.user);

      await dataSources.userAPI.deleteAccountById(req.user.userId);

      await dataSources.potentialMatchAPI.deleteByUserId(req.user.userId);

      return {
        success: true,
        message: "Account Deleted",
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
