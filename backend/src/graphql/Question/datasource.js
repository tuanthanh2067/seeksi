const { DataSource } = require("apollo-datasource");
const { UserInputError, ApolloError } = require("apollo-server-core");

const Question = require("../../schemas/Question/Question");

class QuestionAPI extends DataSource {
  constructor() {
    super();
  }
  async getQuestion() {
    try {
      let questions = [];
      const limit = parseInt(process.env.QUESTION_LIMIT) || 10;
      questions = await Question.aggregate([
        {
          $sample: { size: limit },
        },
      ]);
      return questions.map((obj) => ({
        ...obj,
        id: obj._id,
      }));
    } catch (err) {
      console.log(err);
      throw new ApolloError("Internal Server Error - get question");
    }
  }
}

module.exports.QuestionAPI = QuestionAPI;
