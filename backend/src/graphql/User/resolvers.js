const queries = {
  userByEmail: async (_, args, { dataSources }) => {
    return await dataSources.userAPI.findUserByEmail(args.email);
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
