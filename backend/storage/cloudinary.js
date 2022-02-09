const cloudinary = require("cloudinary").v2;

/**
 *
 * @param {Array} photos array of photo links from client
 * @returns {Array} array of photos links from cloudinary
 */
module.exports.uploadImages = async (photos) => {
  const arrays = await Promise.all(
    photos.map(async (photo) => {
      return await cloudinary.uploader.upload(photo, {
        folder: "images/",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
    })
  );

  const results = arrays.map((photo) =>
    generateImages(photo.width, photo.height, photo.url)
  );

  return results;
};

// landscape and portrait
const checkDimensions = (width, height) => {
  if (width >= height) return "landscape";
  else return "portrait";
};

const sizes = {
  small: 250,
  medium: 500,
  large: 900,
};

// generate images link with different sizes
const generateImages = (width, height, oriLink) => {
  const splittedString = oriLink.split("/upload/");
  // https://res.cloudinary.com/demo/image/upload/docs/models.jpg
  // https://res.cloudinary.com/demo/image/
  // docs/models.jpg
  const root = splittedString[0] + "/upload";
  let sm, md, lg;

  // https://res.cloudinary.com/demo/image/upload/c_fill,h_250/docs/models.jpg
  if (checkDimensions(width, height) === "landscape") {
    // landscape dimension
    if (width >= sizes.large) {
      sm = `${root}/c_fill,w_${sizes.small}/${splittedString[1]}`;
      md = `${root}/c_fill,w_${sizes.medium}/${splittedString[1]}`;
      lg = `${root}/c_fill,w_${sizes.large}/${splittedString[1]}`;
    } else if (width >= sizes.medium) {
      sm = `${root}/c_fill,w_${sizes.small}/${splittedString[1]}`;
      md = `${root}/c_fill,w_${sizes.medium}/${splittedString[1]}`;
      lg = oriLink;
    } else if (width >= sizes.small) {
      sm = `${root}/c_fill,w_${sizes.small}/${splittedString[1]}`;
      md = oriLink;
      lg = oriLink;
    }
  } else {
    // portrait dimension
    if (height >= sizes.large) {
      sm = `${root}/c_fill,h_${sizes.small}/${splittedString[1]}`;
      md = `${root}/c_fill,h_${sizes.medium}/${splittedString[1]}`;
      lg = `${root}/c_fill,h_${sizes.large}/${splittedString[1]}`;
    } else if (height >= sizes.medium) {
      sm = `${root}/c_fill,h_${sizes.small}/${splittedString[1]}`;
      md = `${root}/c_fill,h_${sizes.medium}/${splittedString[1]}`;
      lg = oriLink;
    } else if (height >= sizes.small) {
      sm = `${root}/c_fill,h_${sizes.small}/${splittedString[1]}`;
      md = oriLink;
      lg = oriLink;
    }
  }
  return {
    small: sm,
    medium: md,
    large: lg,
    origin: oriLink,
  };
};
