module.exports.queries = `
    getReports(page: Int, perPage: Int, fromDate: String, toDate: String, status: String, problem: String, name: String): ReportPagination
    getReportById(reportId: ID!): Report
    getNumberOfReports: Int!
`;
