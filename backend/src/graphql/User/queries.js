module.exports.queries = `
  userByEmail(email: String!) : User,
  me: User

  "issue 63: takes UserId, returns User object"
  getUserProfileById(userId: ID!): User
`;
