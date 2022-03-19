module.exports.mutations = `
    submitAnswers(gameRoomId: String!, answers: [String!]!) : GeneralMutationResponse!
    "this is for testing purposes, will be removed"
    createGameRoom(chatRoomId: ID!): GeneralMutationResponse
`;
