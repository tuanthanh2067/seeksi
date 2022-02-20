import { gql } from "@apollo/client";

export const GET_MESSAGE = gql`
  subscription MessageSent($roomId: String!) {
    messageSent(roomId: $roomId) {
      id
      sendBy
      isSeen
      content
      photo {
        medium
      }
    }
  }
`;