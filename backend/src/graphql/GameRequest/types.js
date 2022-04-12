module.exports.types = `
    type GameRequest {
        id: String!
        sentBy: String!
        sentTo: String!
        createdAt: String!
        sentByStatus: String
        sentToStatus: String
    }

    type GameRoomSubscription {
        chatRoomId: String!
        gameRoomId: String!
    }
`;
