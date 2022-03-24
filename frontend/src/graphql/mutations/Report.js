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

export const BAN_USER = gql`
  mutation BanUser($userId: ID!) {
    banUser(userId: $userId) {
      success
      message
    }
  }
`;

export const UPDATE_REPORT_STATUS = gql`
  mutation UpdateReportStatus(
    $updateReportStatusId: String!
    $status: String!
  ) {
    updateReportStatus(id: $updateReportStatusId, status: $status) {
      success
      message
    }
  }
`;
