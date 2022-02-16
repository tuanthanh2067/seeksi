module.exports.types = `
    type Message {
        id: String
        sendBy: String!
        isSeen: Boolean
        content: String
        photo: String
    }

    type Subscription {
        messageSent(roomId: String!): Message
    }
`;
