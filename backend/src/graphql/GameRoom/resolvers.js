const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const queries = {
  getGameRoom: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    // check to see if the user belongs to the game room
    await dataSources.gameRoomAPI.checkUserOfGameRoom(
      args.gameRoomId,
      req.user.userId
    );

    return await dataSources.gameRoomAPI.getGameRoom(args.gameRoomId);
  },
};

const mutations = {
  submitAnswers: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    await dataSources.gameRoomAPI.checkUserOfGameRoom(
      args.gameRoomId,
      req.user.userId
    );

    await dataSources.gameRoomAPI.submitAnswer(
      args.gameRoomId,
      req.user.userId,
      args.answers
    );

    if (args.isFinal) {
      const gameRoom = await dataSources.gameRoomAPI.getGameRoom(
        args.gameRoomId
      );
      pubsub.publish("GAME_ROOM_ANSWERS", {
        finalAnswersSubmitted: gameRoom,
      });
    }

    return {
      success: true,
      message: "Submit successfully",
    };
  },

  finishPlayingGame: async (
    _,
    args,
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    dataSources.playingStatusAPI.updatePlayingStatus(req.user.userId, false);

    return {
      success: true,
      message: "You can play again with another partner now",
    };
  },
};

const subscriptions = {
  finalAnswersSubmitted: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("GAME_ROOM_ANSWERS"),
      (payload, variables) => {
        console.log(payload.finalAnswersSubmitted, "payload");
        console.log(variables, "var");
        return variables.gameRoomId === payload.finalAnswersSubmitted.id;
      }
    ),
  },
};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
