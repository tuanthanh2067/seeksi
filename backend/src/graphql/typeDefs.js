const { gql } = require("apollo-server-express");

const interfaces = require("./interfaces");
const { User } = require("./User");
const { Location } = require("./Location");
const { Preference } = require("./Preference");
const { Image } = require("./Image");
const { AuthPayload } = require("./AuthPayload");
const { Token } = require("./Token");
const { Hobby } = require("./Hobby");
const { PotentialMatch } = require("./PotentialMatch");

const typeDefs = gql`
  ${interfaces.types}

  ${User.types}
  ${Location.types}
  ${Preference.types}
  ${Image.types}
  ${AuthPayload.types}
  ${Token.types}
  ${PotentialMatch.types}
  
  type Query {
    ${User.queries}
    ${Token.queries}
    ${Hobby.queries}
    ${PotentialMatch.queries}
  }
  
  type Mutation {
    ${User.mutations}
    ${Token.mutations}
    ${PotentialMatch.mutations}
  }
`;

module.exports = typeDefs;
