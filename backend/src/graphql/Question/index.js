const { queries } = require("./queries");
const { mutations } = require("./mutations");
const { resolvers } = require("./resolvers");
const { types } = require("./types");
const { QuestionAPI } = require("./datasource");

module.exports.Question = {
  queries,
  mutations,
  resolvers,
  types,
  QuestionAPI,
};
