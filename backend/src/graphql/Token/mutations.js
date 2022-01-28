module.exports.mutations = `
  requestResetPassword(email: String!) : PasswordResetResponse,
  
  resetPassword(
    userId: String!,
    token: String!,
    password: String!,
    confirmPassword: String
  ): PasswordResetResponse,
`;
