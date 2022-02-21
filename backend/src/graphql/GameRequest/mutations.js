module.exports.mutations = `
    sendGameRequest(to: String!): GameRequest!
    
    acceptGameRequest(gameRequestId: String!, chatRoomId: String!): String!

    rejectGameRequest(gameRequestId: String!): String!
`;
