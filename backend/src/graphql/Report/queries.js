module.exports.queries = `
    getReports(page: Int, perPage: Int, fromDate: String, toDate: String): [Report]
    getReportById(reportId: ID!): Report
`;
