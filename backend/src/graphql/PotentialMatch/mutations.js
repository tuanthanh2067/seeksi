module.exports.mutations = `
  "A user send a match request to another user"
  sendMatchRequest(id: String!): GeneralMutationResponse

  "A user send a reject request to another user"
  sendRejectRequest(id: String!): GeneralMutationResponse
`;
