module.exports.queries = `
    getReports(page: Int, perPage: Int, fromDate: String, toDate: String, status): [Report]
    getReportById(reportId: ID!): Report
`;
