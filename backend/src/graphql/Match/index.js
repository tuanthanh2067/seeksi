const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { types } = require("./types");
const { MatchAPI } = require("./datasource");

module.exports.Match = {
  queries,
  mutations,
  resolvers,
  types,
  MatchAPI,
};
