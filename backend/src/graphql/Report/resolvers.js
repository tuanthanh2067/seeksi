const { AuthenticationError, ApolloError } = require("apollo-server-core");
const UserType = require("../../enum/UserType");

const queries = {
  getReports: async (
    _,
    { page, perPage, fromDate, toDate, status, problem, name },
    { dataSources, req, adminAuthentication }
  ) => {
    adminAuthentication(req.user);

    return await dataSources.reportAPI.getReports(
      page,
      perPage,
      fromDate,
      toDate,
      status,
      problem,
      name
    );
  },

  getReportById: async (
    _,
    { reportId },
    { dataSources, req, adminAuthentication }
  ) => {
    adminAuthentication(req.user);
    return await dataSources.reportAPI.getReportById(reportId);
  },

  getNumberOfReports: async (
    _,
    { args },
    { dataSources, req, adminAuthentication }
  ) => {
    adminAuthentication(req.user);

    return await dataSources.reportAPI.getNumberOfReports();
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

  updateReportStatus: async (
    _,
    { id, status },
    { dataSources, req, adminAuthentication }
  ) => {
    adminAuthentication(req.user);

    await dataSources.reportAPI.updateReportStatus({ id, status });

    return {
      success: true,
      message: "Update report status successfully",
    };
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
