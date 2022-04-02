module.exports.mutations = `
  submitReport(
    title: String!
    problem: String!
    description: String!
    reportedUserID: String!
  ): GeneralMutationResponse

  updateReportStatus(id: String!, status: String!): GeneralMutationResponse
`;
