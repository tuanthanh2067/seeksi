import { gql } from "@apollo/client";

export const GET_MESSAGE_HISTORY = gql`
  query Messages($roomId: ID!) {
    messages(roomId: $roomId) {
      id
      sendBy
      content
      isSeen
      photos {
        medium
        origin
      }
    }
  }
`;

export const GET_CHAT_ROOMS = gql`
  query ChatRooms {
    chatRooms {
      id
      partner {
        id
        firstName
        avatar {
          small
        }
      }
      history {
        id
        isSeen
        sendBy
        content
        photos {
          medium
          origin
        }
      }
      isDisabled
      gameRoom
    }
  }
`;

export const GET_OPENING_LINES = gql`
  query getOpeningLine {
    getOpeningLine {
      id
      content
    }
  }
`;
