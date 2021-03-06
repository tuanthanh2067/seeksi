const { ApolloError } = require("apollo-server-core");
const { PubSub, withFilter } = require("graphql-subscriptions");
const mongoose = require("mongoose");

const pubsub = new PubSub();

const queries = {
  getUserGameRequests: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    return await dataSources.gameRequestAPI.getUserGameRequest(req.user.userId);
  },
};

const mutations = {
  sendGameRequest: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    // check partner's online status
    const isPartnerOnline = dataSources.userStatusAPI.isOnline(args.to);
    if (!isPartnerOnline) {
      throw new ApolloError("Partner is offline");
    }

    const gameRequest = await dataSources.gameRequestAPI.sendGameRequestTo(
      req.user.userId,
      args.to
    );

    pubsub.publish("GAME_REQUESTS", {
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

    const gameRequest = await dataSources.gameRequestAPI.getGameRequest(
      args.gameRequestId
    );

    // check partner online status
    const partnerIndex =
      1 - gameRequest.pairID.indexOf(mongoose.Types.ObjectId(req.user.userId));

    const partnerId = gameRequest.pairID[partnerIndex].toString();

    const isPartnerOnline = dataSources.userStatusAPI.isOnline(partnerId);

    if (!isPartnerOnline) {
      return {
        success: false,
        message: "Partner is offline",
      };
    }
    // check partner if they are playing game with anyone else
    if (dataSources.playingStatusAPI.isPlaying(partnerId)) {
      return {
        success: false,
        message: "Partner is playing game.",
      };
    }

    // update me and the partner to playing games if all checks pass
    await dataSources.gameRequestAPI.acceptGameRequest(args.gameRequestId);

    const gameRoomId = await dataSources.gameRoomAPI.createGameRoom(
      args.chatRoomId
    );

    dataSources.playingStatusAPI.updatePlayingStatus(req.user.userId, true);
    dataSources.playingStatusAPI.updatePlayingStatus(partnerId, true);

    pubsub.publish("GAME_ROOMS", {
      gameRoomCreated: {
        chatRoomId: args.chatRoomId,
        gameRoomId: gameRoomId,
      },
    });

    return {
      success: true,
      message: "Accept Successfully",
    };
  },

  rejectGameRequest: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    await dataSources.gameRequestAPI.rejectGameRequest(args.gameRequestId);

    return {
      success: true,
      message: "Reject Successfully",
    };
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

  gameRoomCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("GAME_ROOMS"),
      (payload, variables) => {
        return variables.chatRoomId === payload.gameRoomCreated.chatRoomId;
      }
    ),
  },
};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
