const queries = {};

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
