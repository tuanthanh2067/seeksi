module.exports.mutations = `
    sendGameRequest(to: String!): GameRequest!
    
    acceptGameRequest(gameRequestId: String!, chatRoomId: String!): GeneralMutationResponse!

    rejectGameRequest(gameRequestId: String!): GeneralMutationResponse!
`;
