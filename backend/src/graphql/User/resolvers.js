const { AuthenticationError } = require("apollo-server-core");

const queries = {
  userByEmail: async (_, args, { dataSources }) => {
    return await dataSources.userAPI.findUserByEmail(args.email);
  },

  me: async (_, args, { dataSources, auth }) => {
    if (!auth.isAuth) {
      throw new AuthenticationError("User is not authenticated");
    }
    return await dataSources.userAPI.findUserByEmail(auth.email);
  },

  //do we need authorization here?
  //issue 63: returns user profile identified by the provided userId
  getUserProfileById: async(_, args, {dataSources})=>{
    return dataSources.userAPI.getUserProfileById(args.userId);
  }
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
  login: async (_,args, {dataSources}) =>{
    const token = await dataSources.userAPI.login(args.email,args.password);
    return {
      token: token
    }
  }

};

module.exports.resolvers = {
  queries,
  mutations,
};
