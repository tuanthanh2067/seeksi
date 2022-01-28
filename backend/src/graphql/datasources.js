const { User } = require("./User");
const { Token } = require("./Token");

module.exports = {
  UserAPI: User.UserAPI,
  ResetPasswordAPI: Token.ResetPasswordAPI,
};
