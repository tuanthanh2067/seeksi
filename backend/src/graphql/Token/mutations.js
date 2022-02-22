module.exports.mutations = `
  requestResetPassword(email: String!) : GeneralMutationResponse,
  
  resetPassword(
    userId: String!,
    token: String!,
    password: String!,
    confirmPassword: String
  ): GeneralMutationResponse,
`;
