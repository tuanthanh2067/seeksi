const { PubSub, withFilter } = require("graphql-subscriptions");
const pubsub = new PubSub();

module.exports = {
  gameRoomCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("GAME_ROOMS"),
      (payload, variables) => {
        return variables.chatRoomId === payload.gameRoomCreated.chatRoomId;
      }
    ),
  },
};
