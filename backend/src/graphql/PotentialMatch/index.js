const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { types } = require("./types");
const { PotentialMatchAPI } = require("./datasource");

module.exports.PotentialMatch = {
  queries,
  mutations,
  resolvers,
  types,
  PotentialMatchAPI,
};
