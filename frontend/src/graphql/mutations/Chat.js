import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String, $photos: [Upload!], $roomId: ID!) {
    sendMessage(content: $content, photos: $photos, roomId: $roomId) {
      id
      sendBy
      content
      photos {
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
