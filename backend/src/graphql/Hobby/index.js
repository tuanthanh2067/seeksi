const { queries } = require("./queries");
const { resolvers } = require("./resolvers");
const { HobbyAPI } = require("./datasource");

module.exports.Hobby = {
  queries,
  resolvers,
  HobbyAPI,
};
