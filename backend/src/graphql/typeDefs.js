const { gql } = require("apollo-server-express");

const interfaces = require("./interfaces");
const { User } = require("./User");
const { Location } = require("./Location");
const { Preference } = require("./Preference");
const { Image } = require("./Image");
const { AuthPayload } = require("./AuthPayload");
const { Token } = require("./Token");

const typeDefs = gql`
  ${interfaces.types}

  ${User.types}
  ${Location.types}
  ${Preference.types}
  ${Image.types}
  ${AuthPayload.types}
  ${Token.types}
  
  type Query {
    ${User.queries}
    ${Token.queries}
  }
  
  type Mutation {
    ${User.mutations}
    ${Token.mutations}
  }
`;

module.exports = typeDefs;
