const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { subscriptions } = require("./subscriptions");
const { types } = require("./types");
const { GameRequestAPI } = require("./datasource");

module.exports.GameRequest = {
  queries,
  mutations,
  resolvers,
  subscriptions,
  types,
  GameRequestAPI,
};
