module.exports.types = `
    type Message {
        id: String
        sendBy: String!
        isSeen: Boolean
        content: String
        photos: [Image]
        name: String
        createdAt: String
    }

    type ChatRoom {
        id: String
        partner: User
        history: [Message]
        isDisabled: Boolean
        gameRoom: ID
    }
`;
