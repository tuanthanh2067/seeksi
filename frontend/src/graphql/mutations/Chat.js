import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String, $photo: String, $roomId: ID!) {
    sendMessage(content: $content, photo: $photo, roomId: $roomId) {
      id
      sendBy
      content
      photo {
        medium
      }
      isSeen
    }
  }
`;

export const INCREMENT_USE_COUNT = gql`
  mutation incrementUseCount($lineId: ID!) {
    incrementUseCount(lineId: $lineId) {
      success
      message
    }
  }
`;
