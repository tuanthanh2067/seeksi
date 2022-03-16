const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
  messageSent: {
    subscribe: (_, args, context) => {
      const roomId = args.roomId;
      return pubsub.asyncIterator(`CHANNEL_${roomId}`);
    },
  },
};
