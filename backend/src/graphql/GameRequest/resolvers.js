const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const queries = {};

const mutations = {
  sendGameRequest: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    const gameRequest = await dataSources.gameRequestAPI.sendGameRequestTo(
      req.user.userId,
      args.to
    );

    pubsub.publish(`GAME_REQUESTS`, {
      gameRequestSent: gameRequest,
    });

    return gameRequest;
  },
};

const subscriptions = {
  gameRequestSent: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("GAME_REQUESTS"),
      (payload, variables) => {
        return variables.myId === payload.gameRequestSent.sentTo;
      }
    ),
  },
};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
