import { gql } from "@apollo/client";

export const GET_POTENTIAL_PARTNERS = gql`
  query GetPotentialPartners($page: Int!) {
    getPotentialPartners(page: $page) {
      id
      firstName
      lastName
      bio
      age
      sex
      distance
      hobbies
      avatar {
        medium
      }
    }
  }
`;
