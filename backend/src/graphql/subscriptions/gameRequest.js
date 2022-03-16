const { PubSub, withFilter } = require("graphql-subscriptions");
const pubsub = new PubSub();

module.exports = {
  gameRequestSent: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("GAME_REQUESTS"),
      (payload, variables) => {
        return variables.myId === payload.gameRequestSent.sentTo;
      }
    ),
  },
};
