const { queries } = require("./queries.js");
const { mutations } = require("./mutations.js");
const { resolvers } = require("./resolvers.js");
const { types } = require("./types");
const { ResetPasswordAPI } = require("./datasource");

module.exports.Token = {
  queries,
  mutations,
  resolvers,
  types,
  ResetPasswordAPI,
};
