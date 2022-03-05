module.exports.types = `
    type Message {
        id: String
        sendBy: String!
        isSeen: Boolean
        content: String
        photos: [Image]
    }

    type ChatRoom {
        id: String
        partner: User
        history: [Message]
        isDisabled: Boolean
    }
`;
