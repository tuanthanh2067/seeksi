module.exports.mutations = `
  "Upload a photo to be used as the user's avatar"
  uploadAvatar(file: Upload!): Image!

  "Upload a collection of photos to replace/be inserted into all user's old photos"
  uploadPhotos(files: [Upload!]!, replace: Boolean!): [Image!]!
`;
