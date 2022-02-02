const { UserInputError } = require("apollo-server-core");
const { sendPasswordResetMail } = require("../../utils/mail_service");

const queries = {};

const mutations = {
  requestResetPassword: async (_, args, { dataSources }) => {
    try {
      const user = await dataSources.userAPI.findUserByEmail(args.email);

      if (!user) {
        throw new UserInputError("No account is associated with this email.");
      }

      const resetToken = await dataSources.tokenAPI.createResetToken(user);

      await sendPasswordResetMail(user, resetToken);

      return {
        success: true,
        message:
          "Password reset instructions have been sent to your email address.",
      };
    } catch (err) {
      throw err;
    }
  },
  resetPassword: async (_, args, { dataSources }) => {
    try {
      const valid = await dataSources.tokenAPI.isResetTokenValid(
        args.userId,
        args.token
      );

      if (!valid) {
        throw new UserInputError("Invalid or expired password reset token.");
      }

      await dataSources.userAPI.resetPassword(args);

      return {
        success: true,
        message: "Password has been successfully reset.",
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
