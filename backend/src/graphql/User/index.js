const { queries } = require("./queries.js");
const { mutations } = require("./mutations.js");
const { resolvers } = require("./resolvers.js");
const { types } = require("./types");
const { UserAPI } = require("./datasource");

module.exports.User = {
  queries,
  mutations,
  resolvers,
  types,
  UserAPI,
};
