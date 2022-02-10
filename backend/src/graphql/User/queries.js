module.exports.queries = `
  userByEmail(email: String!) : User,
  userById(userId: ID!): User
  me: User
`;
