import { gql } from '@apollo/client';

export const INCREMENT_TRACK_VIEWS = gql`
  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  }
  
  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }
`;
