module.exports.types = `
    type GameRequest {
        id: String!
        sentBy: String!
        sentTo: String!
        createdAt: String!
    }

    type GameRoomSubscription {
        chatRoomId: String!
        gameRoomId: String!
    }
`;
