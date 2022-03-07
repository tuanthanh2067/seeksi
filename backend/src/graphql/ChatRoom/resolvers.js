const { ApolloError } = require("apollo-server-core");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const queries = {
  messages: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    return await dataSources.chatRoomAPI.getMessages(args.roomId);
  },

  chatRooms: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    return await dataSources.chatRoomAPI.getUserChatRooms(req.user.userId);
  },
};

const mutations = {
  sendMessage: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    const roomId = args.roomId;
    const content = args.content || "";
    const photo = null;

    const isDisabled = await dataSources.chatRoomAPI.isChatRoomDisabled(
      args.roomId
    );
    if (isDisabled) {
      throw new ApolloError("Chat room has been disabled");
    }

    const message = await dataSources.chatRoomAPI.sendMessageToChatRoom(
      roomId,
      content,
      photo,
      req.user.userId
    );

    // publish to channel
    pubsub.publish(`CHANNEL_${roomId}`, {
      messageSent: message,
    });

    return {
      ...message,
    };
  },
};

const subscriptions = {
  messageSent: {
    subscribe: (_, args, context) => {
      const roomId = args.roomId;
      return pubsub.asyncIterator(`CHANNEL_${roomId}`);
    },
  },
};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
