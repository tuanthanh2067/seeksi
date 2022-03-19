const { AuthenticationError, ApolloError } = require("apollo-server-core");
const UserType = require("../../enum/UserType");

const queries = {
  getReport: async (
    _,
    { page, perPage },
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);
    let isAdmin = req.user.role.some((r) => r.includes(UserType.ADMIN));
    if (!isAdmin) {
      throw new ApolloError("User is not an admin");
    }
    return await dataSources.reportAPI.getReport(page, perPage);
  },

  getReportById: async (
    _,
    { reportId },
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);
    let isAdmin = req.user.role.some((r) => r.includes(UserType.ADMIN));
    if (!isAdmin) {
      throw new ApolloError("User is not an admin");
    }
    return await dataSources.reportAPI.getReportById(reportId);
  },
};

const mutations = {
  submitReport: async (
    _,
    { title, problem, description, reportedUserID },
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    await dataSources.reportAPI.createReport({
      title,
      problem,
      description,
      reportedUserID,
      reporterID: req.user.userId,
    });

    return {
      success: true,
      message: "Report submitted successfully!",
    };
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
