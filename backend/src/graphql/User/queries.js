module.exports.queries = `
  userByEmail(email: String!) : User,
  me: User

  getUserProfileById(userId: ID!): User
`;
