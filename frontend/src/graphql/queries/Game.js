import { gql } from "@apollo/client";

export const GET_GAME_ROOM = gql`
  query GetGameRoom($gameRoomId: String!) {
    getGameRoom(gameRoomId: $gameRoomId) {
      id
      questions {
        id
        question
      }
      answers {
        user
        answers
      }
    }
  }
`;
