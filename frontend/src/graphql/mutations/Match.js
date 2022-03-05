import { gql } from "@apollo/client";

export const SEND_MATCH_REQUEST = gql`
  mutation sendMatchRequest($id: String!) {
    sendMatchRequest(id: $id) {
      success
      message
    }
  }
`;

export const SEND_REJECT_REQUEST = gql`
  mutation sendRejectRequest($id: String!) {
    sendRejectRequest(id: $id) {
      success
      message
    }
  }
`;

export const UNMATCH = gql`
  mutation unmatch($id: String!) {
    unmatch(id: $id) {
      success
      message
    }
  }
`;
