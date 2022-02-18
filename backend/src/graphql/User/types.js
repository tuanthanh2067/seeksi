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

  "this type is obsolete, please use GeneralMutationResponse instead"
  type DeleteUserResponse implements MutationResponse {
    success: Boolean!
    message: String!
  }

  "return type of editUser request"
  type EditUserResponse{
    success: Boolean!
    message: [String]
    user: User
  }

`;
