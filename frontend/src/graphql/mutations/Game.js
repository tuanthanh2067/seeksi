import { gql } from "@apollo/client";

export const SEND_GAME_REQUEST = gql`
  mutation sendGameRequest($to: String!, $chatRoomId: String!) {
    sendGameRequest(to: $to, chatRoomId: $chatRoomId) {
      id
      sentBy
      sentTo
      createdAt
    }
  }
`;

export const ACCEPT_GAME_REQUEST = gql`
  mutation acceptGameRequest($gameRequestId: String!, $chatRoomId: String!) {
    acceptGameRequest(gameRequestId: $gameRequestId, chatRoomId: $chatRoomId) {
      success
      message
    }
  }
`;

export const REJECT_GAME_REQUEST = gql`
  mutation rejectGameRequest($gameRequestId: String!, $chatRoomId: String!) {
    rejectGameRequest(gameRequestId: $gameRequestId, chatRoomId: $chatRoomId) {
      success
      message
    }
  }
`;
