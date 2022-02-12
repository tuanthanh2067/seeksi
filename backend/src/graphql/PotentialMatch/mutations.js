module.exports.mutations = `
  "A user send a match request to another user"
  sendMatchRequest(id: String!): PotentialMatchResponse

  "A user send a reject request to another user"
  sendRejectRequest(id: String!): PotentialMatchResponse
`;
