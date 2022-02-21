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

  acceptGameRequest: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    await dataSources.gameRequestAPI.acceptGameRequest(args.gameRequestId);

    await dataSources.gameRoomAPI.createGameRoom(args.chatRoomId);

    return "Accept Successfully";
  },

  rejectGameRequest: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    await dataSources.gameRequestAPI.rejectGameRequest(args.gameRequestId);

    return "Reject Successfully";
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
