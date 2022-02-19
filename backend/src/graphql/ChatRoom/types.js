module.exports.types = `
    type Message {
        id: String
        sendBy: String!
        isSeen: Boolean
        content: String
        photo: Image
    }

    type Subscription {
        messageSent(roomId: String!): Message
    }

    type ChatRoom {
        id: String
        partner: User
        history: [Message]
        isDisabled: Boolean
    }
`;
