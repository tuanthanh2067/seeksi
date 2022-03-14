module.exports.mutations = `
    submitAnswers(gameRoomId: String!, answers: [String!]!) : GeneralMutationResponse!
    "this is for testing purposes"
    createGameRoom(chatRoomId: ID!): GeneralMutationResponse
`;
