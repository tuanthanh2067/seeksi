import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUserProfileById($userId: ID!) {
    userById(userId: $userId) {
      email
      firstName
      lastName
      bio
      dob
      sex
      location {
        city
        province
        country
      }
      hobbies
      avatar {
        medium
      }
      photo {
        large
      }
      preference {
        gender
        distance
        minAge
        maxAge
        longTerm
        shortTerm
      }
    }
  }
`;
