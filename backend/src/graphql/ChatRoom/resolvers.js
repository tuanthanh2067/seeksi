const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");

const pubsub = new PubSub();

const queries = {
  messages: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    const roomId = args.roomId;

    const chatRoom = await dataSources.chatRoomAPI.getChatRoomById(roomId);

    return chatRoom.history.messages;
  },
};

const mutations = {
  sendMessage: async (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    const roomId = args.roomId;
    const content = args.content || "";
    // const photo = args.photo || "";

    const id = mongoose.Types.ObjectId();
    // create a returned message
    const message = {
      sendBy: req.user.userId,
      content,
      // photo,
    };

    // create a message to save to db
    const dbMessage = {
      ...message,
      _id: id,
    };

    // _id and id is the same but the key name is different
    message.id = id;

    const chatRoom = await dataSources.chatRoomAPI.getChatRoomById(roomId);
    if (!chatRoom.history) {
      // create a message history
      const messageHistory = {
        key: "",
        messages: [dbMessage],
      };
      chatRoom.history = messageHistory;
    } else {
      chatRoom.history.messages = [...chatRoom.history.messages, dbMessage];
    }

    // save message to chat room
    await chatRoom.save();

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
