const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { DataSource } = require("apollo-datasource");

const ResetPasswordToken = require("../../schemas/Token/ResetPasswordToken");

require("dotenv").config();

class ResetPasswordAPI extends DataSource {
  constructor() {
    super();
  }

  async findTokenByUserId(userId) {
    if (!userId) {
      return null;
    }

    return await ResetPasswordToken.findOne({ userId });
  }

  async isTokenValid(userId, token) {
    const resetPasswordToken = await this.findTokenByUserId(userId);

    if (!resetPasswordToken) {
      return false;
    }

    const isTokenValid = await bcrypt.compare(token, resetPasswordToken.token);

    if (!isTokenValid) {
      return false;
    }

    await resetPasswordToken.deleteOne();

    return true;
  }

  async createToken(user) {
    try {
      await this.deleteAllTokensByUser(user._id);

      const tokenString = crypto.randomBytes(parseInt(process.env.TOKEN_SIZE)).toString("hex");
      
      const hash = await bcrypt.hash(tokenString, parseInt(process.env.BCRYPT_SALT));

      const token = new ResetPasswordToken({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      });

      await token.save();

      return tokenString;
    } catch (err) {
      throw err;
    }
  }

  async deleteAllTokensByUser(userId) {
    try {
      await ResetPasswordToken.deleteMany({ userId });

      return {
        success: true,
        message: `All password reset tokens associated with user ID {${userId}} were successfully removed!`,
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports.ResetPasswordAPI = ResetPasswordAPI;
