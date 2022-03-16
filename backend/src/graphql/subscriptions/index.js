const chatRoomSubscriptions = require("./chatRoom");
const gameRequestSubscriptions = require("./gameRequest");
const gameRoomSubscriptions = require("./gameRoom");

module.exports = {
  ...chatRoomSubscriptions,
  ...gameRequestSubscriptions,
  ...gameRoomSubscriptions,
};
