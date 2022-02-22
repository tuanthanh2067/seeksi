const { unlink } = require("fs/promises");

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

    await unlink(filePath);

    return avatar;
  },
  uploadPhotos: async (
    _,
    { files, replace },
    { dataSources, req, userAuthentication }
  ) => {
    userAuthentication(req.user);

    const filePaths = await Promise.all(
      files.map(async (file) => await writeFileUpload(file))
    );

    const photos = await uploadImages(filePaths);

    if (replace) {
      await dataSources.userAPI.setPhotos({
        userId: req.user.userId,
        photos,
      });
    } else {
      await dataSources.userAPI.insertPhotos({
        userId: req.user.userId,
        photos,
      });
    }

    for (const filePath of filePaths) {
      await unlink(filePath);
    }

    return photos;
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
