module.exports.mutations = `
  signup(
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    dob: String!
    sex: String!
  ): AuthPayload

  "User login takes 2 params email and password, returns jwt token"
  login(email: String!, password: String!): AuthPayload
`;
