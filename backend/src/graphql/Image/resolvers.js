const { ApolloError } = require("apollo-server-core");

const queries = {};

const mutations = {
  deleteAvatar: async (_, args, { dataSources, req, userAuthentication }) => {
    try {
      userAuthentication(req.user);

      const user = await dataSources.userAPI.getUserProfileById(
        req.user.userId
      );

      const res = await dataSources.imageAPI.deleteImage(user.avatar.origin);

      // res.result = ok || not found
      if (res.result === "ok") {
        await dataSources.userAPI.deleteAvatar(req.user.userId);

        return {
          success: true,
          message: "Remove avatar successfully",
        };
      } else {
        return {
          success: false,
          message: "Cannot find the image, please try again",
        };
      }
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  },

  deletePhoto: async (_, args, { dataSources, req, userAuthentication }) => {
    try {
      userAuthentication(req.user);

      let success = false;
      let message = "";

      const user = await dataSources.userAPI.getUserProfileById(
        req.user.userId
      );

      // find the index of the photo
      const index = user.photo.findIndex((p) => {
        return (
          p.origin === args.path ||
          p.small === args.path ||
          p.medium === args.path ||
          p.large === args.path
        );
      });

      if (index !== -1) {
        const res = await dataSources.imageAPI.deleteImage(args.path);

        if (res.result === "ok") {
          await dataSources.userAPI.deletePhoto(req.user.userId, index);

          success = true;
          message = "Remove photo successfully";
        } else {
          success = false;
          message = "Cannot find the image, please try again";
        }
      } else {
        // no image can be found
        success = false;
        message = "Cannot find the image, please try again";
      }

      return {
        success,
        message,
      };
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal Server Error");
    }
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
