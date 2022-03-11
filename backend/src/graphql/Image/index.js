const { types } = require("./types");
const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { ImageAPI } = require("./datasources");

module.exports.Image = {
  queries,
  mutations,
  types,
  resolvers,
  ImageAPI,
};
