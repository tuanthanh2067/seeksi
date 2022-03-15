const { DataSource } = require("apollo-datasource");
const { UserInputError, ApolloError } = require("apollo-server-core");

const Question = require("../../schemas/Question/Question");

class QuestionAPI extends DataSource {
  constructor() {
    super();
  }
}

module.exports.QuestionAPI = QuestionAPI;
