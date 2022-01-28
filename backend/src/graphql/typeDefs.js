const { gql } = require("apollo-server-express");

const { User } = require("./User");
const { Location } = require("./Location");
const { Preference } = require("./Preference");
const { Image } = require("./Image");

const typeDefs = gql`
  ${User.types}
  ${Location.types}
  ${Preference.types}
  ${Image.types}
  
  type Query {
    ${User.queries}
  }
  
  type Mutation {
    ${User.mutations}
  }
`;

module.exports = typeDefs;
