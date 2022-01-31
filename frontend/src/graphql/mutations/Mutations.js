import { gql } from "@apollo/client";

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
