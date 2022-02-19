module.exports.types = `
<<<<<<< HEAD

=======
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

  type PotentialMatchResponse implements MutationResponse {
    success: Boolean!
    message: String!
  }
>>>>>>> main
`;
