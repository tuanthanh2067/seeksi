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
        origin
      }
      photo {
        large
        origin
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

export const GET_USER_STATUSES = gql`
  query getUserStatuses($partnerIds: [String!]!) {
    getUserStatuses(partnerIds: $partnerIds) {
      userId
      lastSeen
    }
  }
`;
