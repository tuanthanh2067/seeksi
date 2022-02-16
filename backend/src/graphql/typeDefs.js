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
const { OpeningLine } = require("./OpeningLine");
const { SharedType } = require("./SharedType");
const { GameRoom } = require("./GameRoom");
const { GameRequest } = require("./GameRequest");
const { Upload } = require("./Upload");

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
  ${GameRoom.types}
  ${GameRequest.types}
  ${UserStatus.types}
  ${OpeningLine.types}
  ${Upload.types}
  
  type Query {
    ${User.queries}
    ${Token.queries}
    ${Hobby.queries}
    ${PotentialMatch.queries}
    ${Match.queries}
    ${ChatRoom.queries}
    ${Report.queries}
    ${GameRoom.queries}
    ${GameRequest.queries}
    ${UserStatus.queries}
    ${OpeningLine.queries}
    ${Upload.queries}
  }
  
  type Mutation {
    ${User.mutations}
    ${Token.mutations}
    ${PotentialMatch.mutations}
    ${Match.mutations}
    ${ChatRoom.mutations}
    ${Report.mutations}
    ${GameRoom.mutations}
    ${GameRequest.mutations}
    ${OpeningLine.mutations}
  }

  type Subscription {
    ${GameRoom.subscriptions}
    ${GameRequest.subscriptions}
    ${UserStatus.subscriptions}
    ${ChatRoom.subscriptions}
  }
`;

module.exports = typeDefs;
