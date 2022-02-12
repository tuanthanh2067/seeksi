const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { types } = require("./types");
const { ChatRoomAPI } = require("./datasource");

module.exports.ChatRoom = {
  queries,
  mutations,
  resolvers,
  types,
  ChatRoomAPI,
};
