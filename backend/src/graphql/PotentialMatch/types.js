module.exports.types = `
  type PartnerCard {
    id: ID!
    firstName: String!
    lastName: String!
    bio: String
    age: String!
    sex: String!
    distance: Float!
    hobbies: [String]
    avatar: Image
  }
`;
