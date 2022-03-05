import { gql } from "@apollo/client";

export const GET_MESSAGE_HISTORY = gql`
  query Messages($roomId: ID!) {
    messages(roomId: $roomId) {
      id
      sendBy
      content
      isSeen
      photo {
        medium
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
        photo {
          medium
        }
      }
      isDisabled
    }
  }
`;
