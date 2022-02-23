const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { subscriptions } = require("./subscriptions");
const { types } = require("./types");
const { GameRoomAPI } = require("./datasource");

module.exports.GameRoom = {
  queries,
  mutations,
  resolvers,
  subscriptions,
  types,
  GameRoomAPI,
};
