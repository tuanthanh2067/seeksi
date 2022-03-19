module.exports.queries = `
    getReport(page: Int, perPage: Int): [Report]
    getReportById(reportId: ID!): Report
`;
