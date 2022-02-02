const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { DataSource } = require("apollo-datasource");

const Token = require("../../schemas/Token/Token");

require("dotenv").config();

class TokenAPI extends DataSource {
  constructor() {
    super();
  }

  async findToken(userId, tokenType) {
    if (!userId) {
      return null;
    }

    return await Token.findOne({ userId, tokenType });
  }

  async isResetTokenValid(userId, token) {
    const resetToken = await this.findToken(userId, Token.TokenType.PASSWORD_RESET);

    if (!resetToken) {
      return false;
    }

    const isTokenValid = await bcrypt.compare(token, resetToken.token);

    if (!isTokenValid) {
      return false;
    }

    await resetToken.deleteOne();

    return true;
  }

  async createResetToken(user) {
    try {
      await Token.deleteMany({ 
        userId: user._id,
        tokenType: Token.TokenType.PASSWORD_RESET
      });

      const tokenString = crypto.randomBytes(parseInt(process.env.TOKEN_SIZE)).toString("hex");
      
      const hash = await bcrypt.hash(tokenString, parseInt(process.env.SALT_ROUND));

      const token = new Token({
        userId: user._id,
        tokenType: Token.TokenType.PASSWORD_RESET,
        token: hash,
        createdAt: Date.now(),
      });

      await token.save();

      return tokenString;
    } catch (err) {
      throw err;
    }
  }
}

module.exports.TokenAPI = TokenAPI;
