const { DataSource } = require("apollo-datasource");

const cloudStorage = require("../../../storage/cloudinary");

class ImageAPI extends DataSource {
  constructor() {
    super();
  }

  async deleteImage(path) {
    try {
      return cloudStorage.deleteImage(path);
    } catch (err) {
      throw err;
    }
  }
}

module.exports.ImageAPI = ImageAPI;
