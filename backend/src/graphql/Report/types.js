module.exports.types = `
  type Report{
    id: ID!,
    title: String!,
    problem: String!,
    description: String!,
    reportedUserID: ID!,
    reporterID: ID!
  }
`;
