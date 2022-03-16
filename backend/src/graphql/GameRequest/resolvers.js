const { ApolloError } = require("apollo-server-core");
const mongoose = require("mongoose");

const { GAME_REQUEST } = require("../../enum/GameRequest");

const subs = require("../subscriptions/index");

const queries = {};

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

    // send message
    const message = await dataSources.chatRoomAPI.sendMessageToChatRoom(
      args.chatRoomId,
      req.user.userId,
      "sent a game request"
    );

    message.name = GAME_REQUEST;

    // publish to channel
    pubsub.publish(`CHANNEL_${args.chatRoomId}`, {
      messageSent: message,
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
    dataSources.playingStatusAPI.updatePlayingStatus(req.user.userId, true);

    dataSources.playingStatusAPI.updatePlayingStatus(partnerId, true);

    await dataSources.gameRequestAPI.acceptGameRequest(args.gameRequestId);

    const gameRoomId = await dataSources.gameRoomAPI.createGameRoom(
      args.chatRoomId
    );

    pubsub.publish("GAME_ROOMS", {
      gameRoomCreated: {
        chatRoomId: args.chatRoomId,
        gameRoomId: gameRoomId,
      },
    });

    // send message
    const message = await dataSources.chatRoomAPI.sendMessageToChatRoom(
      args.chatRoomId,
      req.user.userId,
      "accepted the game request"
    );

    message.name = GAME_REQUEST;

    // publish to channel
    pubsub.publish(`CHANNEL_${args.chatRoomId}`, {
      messageSent: message,
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

    // send message
    const message = await dataSources.chatRoomAPI.sendMessageToChatRoom(
      args.chatRoomId,
      req.user.userId,
      "rejected the game request"
    );

    message.name = GAME_REQUEST;

    // publish to channel
    pubsub.publish(`CHANNEL_${args.chatRoomId}`, {
      messageSent: message,
    });

    return {
      success: true,
      message: "Reject Successfully",
    };
  },
};

const subscriptions = {
  ...subs,
};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
