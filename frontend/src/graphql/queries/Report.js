import { gql } from "@apollo/client";

export const GET_REPORTS = gql`
  query GetReports(
    $page: Int
    $perPage: Int
    $fromDate: String
    $toDate: String
    $status: String
    $problem: String
    $name: String
  ) {
    getReports(
      page: $page
      perPage: $perPage
      fromDate: $fromDate
      toDate: $toDate
      status: $status
      problem: $problem
      name: $name
    ) {
      reports {
        id
        title
        problem
        description
        reportedUserID {
          id
          firstName
          lastName
        }
        reporterID {
          id
          firstName
          lastName
        }
        createdAt
        status
      }
      totalPages
      totalReports
    }
  }
`;

export const GET_REPORT_BY_ID = gql`
  query GetReportById($reportId: ID!) {
    getReportById(reportId: $reportId) {
      id
      title
      problem
      description
      reportedUserID {
        id
        firstName
        lastName
      }
      reporterID {
        id
        firstName
        lastName
      }
      createdAt
      status
    }
  }
`;
