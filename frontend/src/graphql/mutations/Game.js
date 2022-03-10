import { gql } from "@apollo/client";

export const SEND_GAME_REQUEST = gql`
  mutation sendGameRequest($to: String!) {
    sendGameRequest(to: $to) {
      id
      sentBy
      sentTo
      createdAt
    }
  }
`;
