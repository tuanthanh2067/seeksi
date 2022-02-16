module.exports.mutations = `
  submitReport(
    title: String!
    problem: String!
    description: String
    reportedUserID: String!
  ): GeneralMutationResponse
`;
