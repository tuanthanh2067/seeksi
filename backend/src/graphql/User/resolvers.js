const { AuthenticationError, ApolloError } = require("apollo-server-core");

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

  editUser: async (_, args, { dataSources, req, userAuthentication }) => {
    try {
      userAuthentication(req.user);
      const userId = req.user.userId;
      const editingUser = {
        country: args.country,
        city: args.city,
        province: args.province,
        sex: args.sex,
        genderPref: args.genderPref,
        hobbies: args.hobbies,
        bio: args.bio,
        distance: args.distance,
        minAge: args.minAge,
        maxAge: args.maxAge,
        longTerm: args.longTerm,
        shortTerm: args.shortTerm,
      };
      const { errors } = await dataSources.userAPI.editUserById(
        userId,
        editingUser
      );
      if (errors.length > 0) {
        throw new ApolloError("Edit user error", errors);
      } else {
        let user = await dataSources.userAPI.getUserProfileById(userId);
        return {
          success: true,
          message: ["Profile updated"],
          user: user,
        };
      }
    } catch (err) {
      throw err;
    }
  },

  banUser: async (
    _,
    { userId },
    { dataSources, req, userAuthentication, isAdmin }
  ) => {
    try {
      userAuthentication(req.user);
      isAdmin(req.user);
      await dataSources.userAPI.banUser(userId);
      return {
        success: true,
        message: "Account Banned",
      };
    } catch (err) {
      throw err;
    }
  },

  unbanUser: async (
    _,
    { userId },
    { dataSources, req, userAuthentication, isAdmin }
  ) => {
    try {
      userAuthentication(req.user);
      isAdmin(req.user);
      await dataSources.userAPI.unbanUser(userId);
      return {
        success: true,
        message: "Account Unbanned",
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
