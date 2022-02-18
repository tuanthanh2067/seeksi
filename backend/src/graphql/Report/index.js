const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { types } = require("./types");
const { ReportAPI } = require("./datasource");

module.exports.Report = {
  queries,
  mutations,
  resolvers,
  types,
  ReportAPI,
};
