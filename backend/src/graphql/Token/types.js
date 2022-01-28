module.exports.types = `
  type PasswordResetResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;
