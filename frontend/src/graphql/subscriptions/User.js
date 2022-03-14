import { gql } from "@apollo/client";

export const STATUS_UPDATED = gql`
  subscription Subscription($partners: [String!]!) {
    statusUpdated(partners: $partners) {
      userId
      lastSeen
    }
  }
`;
