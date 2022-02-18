module.exports.types = `

  "this type is obsolete, please use GeneralMutationResponse instead"
  type PotentialMatchResponse implements MutationResponse {
    success: Boolean!
    message: String!
  }
`;
