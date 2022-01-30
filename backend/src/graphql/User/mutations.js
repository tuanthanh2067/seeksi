module.exports.mutations = `
  signup(
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    dob: String!
    sex: String!
  ): AuthPayload
`;
