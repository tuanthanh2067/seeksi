import { gql } from "@apollo/client";

export const DELETE_ACCOUNT_MUTATION = gql`
  mutation deleteAccount {
    deleteAccount {
      success
      message
    }
  }
`;
