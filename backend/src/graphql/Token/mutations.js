module.exports.mutations = `
  requestResetPassword(email: String!) : TokenResponse,
  
  resetPassword(
    userId: String!,
    token: String!,
    password: String!,
    confirmPassword: String
  ): TokenResponse,
`;
