const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { types } = require("./types");
const { OpeningLineAPI } = require("./datasource");

module.exports.OpeningLine = {
  queries,
  mutations,
  resolvers,
  types,
  OpeningLineAPI,
};
