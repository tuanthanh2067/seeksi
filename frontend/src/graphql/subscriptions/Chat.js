import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSent($roomId: String!) {
    messageSent(roomId: $roomId) {
      id
      sendBy
      isSeen
      content
      photos {
        medium
        origin
      }
      name
    }
  }
`;

export const GAME_REQUEST_SUBSCRIPTION = gql`
  subscription GameRequestSent($myId: String!) {
    gameRequestSent(myId: $myId) {
      id
      sentBy
      sentTo
      createdAt
    }
  }
`;
