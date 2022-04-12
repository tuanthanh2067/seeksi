import { gql } from "@apollo/client";

export const ANSWER_SUBMITTED = gql`
  subscription finalAnswersSubmitted($gameRoomId: String!) {
    finalAnswersSubmitted(gameRoomId: $gameRoomId) {
      id
      questions {
        id
        question
      }
      answers {
        user
        answers
        submitted_status
      }
    }
  }
`;
