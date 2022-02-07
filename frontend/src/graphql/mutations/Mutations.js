import { gql } from "@apollo/client";

export const USER_LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const USER_REGISTER_MUTATION = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $dob: String!
    $sex: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      dob: $dob
      sex: $sex
    ) {
      token
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation requestResetPassword($email: String!) {
    requestResetPassword(email: $email) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $userId: String!
    $token: String!
    $password: String!
  ) {
    resetPassword(userId: $userId, token: $token, password: $password) {
      success
      message
    }
  }
`;
