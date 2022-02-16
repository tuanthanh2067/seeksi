module.exports.mutations = `
  uploadAvatar(file: Upload!): Image!
  uploadPhotos(files: [Upload!]!): [Image!]!
`;
