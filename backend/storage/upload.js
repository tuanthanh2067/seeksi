// const { createWriteStream } = require("fs");
const temp = require("temp").track();
const { finished } = require("stream/promises");

const { SUPPORTED_MIMETYPE } = require("./cloudinary");

/**
 * Write the file uploaded from the client.
 *
 * @param {Object} upload the uploaded file object
 * @returns {String} the path to the file
 */
module.exports.writeFileUpload = async (upload) => {
  const { createReadStream, mimetype } = await upload;
  const isMimetypeSupported =
    SUPPORTED_MIMETYPE.findIndex((type) => type.mimetype === mimetype) > -1;

  if (!isMimetypeSupported) {
    throw new Error("File format not supported!");
  }

  const stream = createReadStream();
  const out = temp.createWriteStream();

  stream.pipe(out);

  await finished(out);

  return out.path;
};
