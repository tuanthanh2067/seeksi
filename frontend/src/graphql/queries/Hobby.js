import { gql } from "@apollo/client";

export const GET_HOBBY = gql`
  query getAllHobbies {
    getHobbies
  }
`;
