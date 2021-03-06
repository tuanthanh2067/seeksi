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

export const EDIT_PROFILE_MUTATION = gql`
  mutation editUser(
    $country: String
    $city: String
    $province: String
    $sex: String
    $genderPref: String
    $longTerm: Boolean
    $shortTerm: Boolean
    $hobbies: [String]
    $bio: String
    $distance: Int
    $minAge: Int
    $maxAge: Int
  ) {
    editUser(
      country: $country
      city: $city
      province: $province
      sex: $sex
      genderPref: $genderPref
      longTerm: $longTerm
      shortTerm: $shortTerm
      hobbies: $hobbies
      bio: $bio
      distance: $distance
      minAge: $minAge
      maxAge: $maxAge
    ) {
      success
      message
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateMyStatus {
    updateMyStatus {
      userId
      lastSeen
    }
  }
`;
