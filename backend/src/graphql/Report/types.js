module.exports.types = `
  type ReportPagination {
    reports: [Report]
    totalReports: Int!
    totalPages: Int!
    limit: Int!
    page: Int!
  }
  
  type Report {
    id: ID!,
    title: String!,
    problem: String!,
    description: String!,
    reportedUserID: ReportUser!,
    reporterID: ReportUser!,
    createdAt: String!
    status: String!
  }

  type ReportUser {
    id: ID!,
    firstName: String!,
    lastName: String!
  }
`;
