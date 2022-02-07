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

  "Set user's location. Client can pass either city and province OR longitude and latitude"
  setLocation(city: String, province: String, longitude: Float, latitude: Float): User
`;
