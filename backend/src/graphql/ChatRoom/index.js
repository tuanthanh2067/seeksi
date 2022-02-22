const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { subscriptions } = require("./subscriptions");
const { types } = require("./types");
const { ChatRoomAPI } = require("./datasource");

module.exports.ChatRoom = {
  queries,
  mutations,
  resolvers,
  subscriptions,
  types,
  ChatRoomAPI,
};
