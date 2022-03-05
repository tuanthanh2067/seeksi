const { DataSource } = require("apollo-datasource");
const { ApolloError } = require("apollo-server-core");
const mongoose = require("mongoose");
const Cryptr = require("cryptr");
require("dotenv").config();

const ChatRoom = require("../../schemas/ChatRoom/ChatRoom");
const UserTypeEnum = require("../../enum/UserType");

class ChatRoomAPI extends DataSource {
  constructor() {
    super();
  }

  async createChatRoom(userId, partnerId) {
    try {
      const user = mongoose.Types.ObjectId(userId);
      const partner = mongoose.Types.ObjectId(partnerId);

      const roomId = mongoose.Types.ObjectId();

      let secretKey = process.env.ENCRYPT_KEY;
      if (process.env.NODE_ENV === "production") {
        secretKey = roomId.toString();
      }

      const cryptr = new Cryptr(secretKey);

      const adminMessage = [
        {
          sendBy: UserTypeEnum.ADMIN,
          content: cryptr.encrypt("Welcome to your room"),
        },
        {
          sendBy: UserTypeEnum.ADMIN,
          content: cryptr.encrypt("You are a match"),
        },
        {
          sendBy: UserTypeEnum.ADMIN,
          content: cryptr.encrypt(
            "You can start off by sending your message or select our opening lines or just play a game"
          ),
        },
      ];

      const messageHistory = {
        key: secretKey,
        messages: adminMessage,
      };

      const chatRoom = new ChatRoom({
        _id: roomId,
        pairID: [user, partner],
        history: messageHistory,
      });

      await chatRoom.save();

      return {
        id: chatRoom.id,
      };
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async getChatRoomById(roomId) {
    try {
      const chatRoom = await ChatRoom.findById(roomId).exec();

      if (!chatRoom) {
        throw new ApolloError("Can not find chat room");
      }

      return chatRoom;
    } catch (err) {
      console.log(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async sendMessageToChatRoom(roomId, sendBy, content = "", photos = []) {
    const id = mongoose.Types.ObjectId();
    const isSeen = false;

    let secretKey = process.env.ENCRYPT_KEY;
    if (process.env.NODE_ENV === "production") {
      secretKey = roomId;
    }

    const cryptr = new Cryptr(secretKey);

    // create a returned message
    const message = {
      sendBy,
      content,
      photos,
      isSeen,
    };

    // create a message to save to db
    const dbMessage = {
      ...message,
      _id: id,
      content: cryptr.encrypt(content),
    };

    message.id = id;

    const chatRoom = await this.getChatRoomById(roomId);

    chatRoom.history.messages = [...chatRoom.history.messages, dbMessage];

    await chatRoom.save();

    return message;
  }

  async getMessages(roomId) {
    const chatRoom = await this.getChatRoomById(roomId);

    let secretKey = process.env.ENCRYPT_KEY;
    if (process.env.NODE_ENV === "production") {
      secretKey = roomId;
    }
    const cryptr = new Cryptr(secretKey);

    const messages = chatRoom.history.messages.map((message) => {
      return {
        ...message._doc,
        id: message._id,
        content: cryptr.decrypt(message.content),
      };
    });

    return messages;
  }

  async getUserChatRooms(userId) {
    const chatRooms = await ChatRoom.find({
      pairID: { $in: [userId] },
      isDisabled: false,
    })
      .populate("pairID")
      .exec();

    const res = chatRooms.map(async (chatRoom) => {
      const partnerIndex = chatRoom.pairID[0].id === userId ? 1 : 0;

      const history = await this.getMessages(chatRoom.id);

      chatRoom.pairID[partnerIndex].password = "";

      return {
        id: chatRoom.id,
        partner: chatRoom.pairID[partnerIndex],
        history,
        isDisabled: chatRoom.isDisabled,
      };
    });

    return res;
  }

  async disableByUserId(userId, partnerId) {
    const pairID = [
      mongoose.Types.ObjectId(userId),
      mongoose.Types.ObjectId(partnerId),
    ];

    const chatroom = await ChatRoom.findOne({ pairID: { $all: pairID } });

    if (!chatroom) {
      throw new ApolloError("Chat room can't be found!");
    }

    chatroom.isDisabled = true;

    await chatroom.save();
  }
}

module.exports.ChatRoomAPI = ChatRoomAPI;
