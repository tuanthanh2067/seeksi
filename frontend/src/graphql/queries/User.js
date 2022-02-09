import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUserProfileById($userId: ID!) {
    userById(userId: $userId) {
      firstName
      lastName
      bio
      dob
      sex
      location {
        city
        province
      }
      hobbies
      avatar {
        medium
      }
      photo {
        large
      }
    }
  }
`;
