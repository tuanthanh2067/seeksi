module.exports.mutations = `
    sendGameRequest(to: String!, chatRoomId: String!): GameRequest!
    
    acceptGameRequest(gameRequestId: String!, chatRoomId: String!): GeneralMutationResponse!

    rejectGameRequest(gameRequestId: String!, chatRoomId: String!): GeneralMutationResponse!
`;
