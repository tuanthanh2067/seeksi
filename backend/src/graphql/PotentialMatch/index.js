const { queries } = require("./queries.js");
const { mutations } = require("./mutations.js.js");
const { resolvers } = require("./resolvers.js");
const { types } = require("./types");
const { PotentialMatchAPI } = require("./datasource");

module.exports.PotentialMatch = {
  queries,
  mutations,
  resolvers,
  types,
  PotentialMatchAPI,
};
