const { User } = require("./User");
const { Token } = require("./Token");
const { Hobby } = require("./Hobby");
const { PotentialMatch } = require("./PotentialMatch");

module.exports = {
  UserAPI: User.UserAPI,
  TokenAPI: Token.TokenAPI,
  HobbyAPI: Hobby.HobbyAPI,
  PotentialMatchAPI: PotentialMatch.PotentialMatchAPI,
};
