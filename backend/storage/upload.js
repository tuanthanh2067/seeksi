const { createWriteStream } = require("fs");
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
  const baseDir = "storage";
  const seed = Math.floor(Math.random() * 100000);
  const createAt = new Date().getTime();
  const extension = SUPPORTED_MIMETYPE.find(
    (type) => type.mimetype === mimetype
  ).extension;

  if (!extension) {
    throw new Error("File format not supported!");
  }

  const filePath = `${baseDir}/${seed}_${createAt}.${extension}`;

  const stream = createReadStream();
  const out = createWriteStream(filePath);

  stream.pipe(out);

  await finished(out);

  return filePath;
};
