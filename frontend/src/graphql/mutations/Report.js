import { gql } from "@apollo/client";

export const SUBMIT_REPORT_MUTATION = gql`
  mutation submitReport(
    $title: String!
    $problem: String!
    $description: String!
    $reportedUserID: String!
  ) {
    submitReport(
      title: $title
      problem: $problem
      description: $description
      reportedUserID: $reportedUserID
    ) {
      success
      message
    }
  }
`;
