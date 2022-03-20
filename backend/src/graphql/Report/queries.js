module.exports.queries = `
    getReports(page: Int, perPage: Int): [Report]
    getReportById(reportId: ID!): Report
`;
