module.exports.types = `
    type Message {
        id: String
        sendBy: String!
        isSeen: Boolean
        content: String
        photo: Image
    }

    type ChatRoom {
        id: String
        partner: User
        history: [Message]
        isDisabled: Boolean
    }
`;
