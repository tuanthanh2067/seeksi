const { queries } = require("./queries.js");
const { mutations } = require("./mutations.js");
const { resolvers } = require("./resolvers.js");
const { subscriptions } = require("./subscriptions");
const { types } = require("./types");
const { UserStatusAPI } = require("./datasource");

module.exports.UserStatus = {
  queries,
  mutations,
  resolvers,
  subscriptions,
  types,
  UserStatusAPI,
};
