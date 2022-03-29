module.exports.queries = `
    getReports(page: Int, perPage: Int, fromDate: String, toDate: String, status: String, problem: String): [Report]
    getReportById(reportId: ID!): Report
`;
