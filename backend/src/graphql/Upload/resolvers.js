const temp = require("temp").track();
const { UserInputError } = require("apollo-server-core");

const { writeFileUpload } = require("../../../storage/upload");
const { uploadImages } = require("../../../storage/cloudinary");

const queries = {};

const mutations = {
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
