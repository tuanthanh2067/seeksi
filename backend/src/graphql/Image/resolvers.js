const { ApolloError } = require("apollo-server-core");
const temp = require("temp").track();
const { UserInputError } = require("apollo-server-core");

const { writeFileUpload } = require("../../../storage/upload");
const { uploadImages } = require("../../../storage/cloudinary");

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

  uploadAvatar: async (
    _,
    { file },
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    const filePath = await writeFileUpload(file);

    const [avatar] = await uploadImages([filePath]);

    await dataSources.userAPI.setAvatar({
      userId: req.user.userId,
      avatar,
    });

    temp.cleanup();

    return avatar;
  },
  uploadPhotos: async (
    _,
    { files, replace },
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    const { userId } = req.user;

    if (!replace) {
      const { photo } = await dataSources.userAPI.getUserProfileById(userId);

      if (photo.length + files.length > process.env.MAX_IMAGE_UPLOAD) {
        throw new UserInputError("New photos overflow photos per user limit!");
      }
    }

    const filePaths = await Promise.all(
      files.map(async (file) => await writeFileUpload(file))
    );

    // Only upload images to Cloudinary if they don't violate any business rules
    // e.g. the number of images don't exceed the upload limit per user
    const photos = await uploadImages(filePaths);

    if (replace) {
      await dataSources.userAPI.setPhotos({
        userId,
        photos,
      });
    } else {
      await dataSources.userAPI.insertPhotos({
        userId,
        photos,
      });
    }

    temp.cleanup();

    return photos;
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
