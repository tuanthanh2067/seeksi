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
const { Match } = require("./Match");
const { ChatRoom } = require("./ChatRoom");
const { Report } = require("./Report");
const { UserStatus } = require("./UserStatus");
const { SharedType } = require("./SharedType");

const typeDefs = gql`
  ${interfaces.types}
  ${SharedType.types}
  ${User.types}
  ${Location.types}
  ${Preference.types}
  ${Image.types}
  ${AuthPayload.types}
  ${Token.types}
  ${PotentialMatch.types}
  ${Match.types}
  ${ChatRoom.types}
  ${Report.types}
  ${UserStatus.types}
  
  type Query {
    ${User.queries}
    ${Token.queries}
    ${Hobby.queries}
    ${PotentialMatch.queries}
    ${Match.queries}
    ${ChatRoom.queries}
    ${Report.queries}
    ${UserStatus.queries}
  }
  
  type Mutation {
    ${User.mutations}
    ${Token.mutations}
    ${PotentialMatch.mutations}
    ${Match.mutations}
    ${ChatRoom.mutations}
    ${Report.mutations}
    ${UserStatus.mutations}
  }

  type Subscription {
    ${UserStatus.subscriptions}
    ${ChatRoom.subscriptions}
  }
`;

module.exports = typeDefs;
