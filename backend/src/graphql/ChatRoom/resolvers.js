const { ApolloError } = require("apollo-server-core");
const { PubSub } = require("graphql-subscriptions");
const { UserInputError } = require("apollo-server-core");
const { unlink } = require("fs/promises");

const { writeFileUpload } = require("../../../storage/upload");
const { uploadImages } = require("../../../storage/cloudinary");

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

    if (args.photos && Array.isArray(args.photos)) {
      const filePaths = await Promise.all(
        args.photos.map(async (photo) => await writeFileUpload(photo))
      );

      const photos = await uploadImages(filePaths);

      const message = await dataSources.chatRoomAPI.sendMessageToChatRoom(
        args.roomId,
        req.user.userId,
        args.content,
        photos
      );

      for (const filePath of filePaths) {
        await unlink(filePath);
      }

      // publish to channel
      pubsub.publish(`CHANNEL_${args.roomId}`, {
        messageSent: message,
      });

      return {
        ...message,
      };
    }

    if (!args.content || typeof args.content !== "string") {
      throw new UserInputError("Invalid message");
    }

    const isDisabled = await dataSources.chatRoomAPI.isChatRoomDisabled(
      args.roomId
    );
    if (isDisabled) {
      throw new ApolloError("Chat room has been disabled");
    }

    const message = await dataSources.chatRoomAPI.sendMessageToChatRoom(
      args.roomId,
      req.user.userId,
      args.content
    );

    // publish to channel
    pubsub.publish(`CHANNEL_${args.roomId}`, {
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
