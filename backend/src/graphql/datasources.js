const { User } = require("./User");
const { Token } = require("./Token");
const { Hobby } = require("./Hobby");
const { PotentialMatch } = require("./PotentialMatch");
const { Match } = require("./Match");
const { ChatRoom } = require("./ChatRoom");
const { Report } = require("./Report");
const { UserStatus } = require("./UserStatus");

module.exports = {
  UserAPI: User.UserAPI,
  TokenAPI: Token.TokenAPI,
  HobbyAPI: Hobby.HobbyAPI,
  PotentialMatchAPI: PotentialMatch.PotentialMatchAPI,
  MatchAPI: Match.MatchAPI,
  ChatRoomAPI: ChatRoom.ChatRoomAPI,
  ReportAPI: Report.ReportAPI,
  UserStatusAPI: UserStatus.UserStatusAPI
};
