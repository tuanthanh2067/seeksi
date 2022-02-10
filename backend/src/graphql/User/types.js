module.exports.types = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    bio: String
    password: String
    dob: String!
    sex: String!
    location: Location
    hobbies: [String]
    preference: Preference
    avatar: Image
    photo: [Image]
    role: String!
    isDisabled: Boolean
    createdAt: String
  }
`;
