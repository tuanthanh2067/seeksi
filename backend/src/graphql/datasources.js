const { User } = require("./User");
const { Token } = require("./Token");
const { Hobby } = require("./Hobby");

module.exports = {
  UserAPI: User.UserAPI,
  TokenAPI: Token.TokenAPI,
  HobbyAPI: Hobby.HobbyAPI,
};
