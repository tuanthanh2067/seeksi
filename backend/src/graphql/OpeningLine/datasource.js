const { DataSource } = require("apollo-datasource");
const {
  UserInputError,
  ApolloError,
  AuthenticationError,
} = require("apollo-server-core");
const OpeningLine = require("../../schemas/OpeningLine/OpeningLine");

require("dotenv").config();

class OpeningLineAPI extends DataSource {
  constructor() {
    super();
  }

  async getOpeningLine() {
    try {
      let lines = [];
      //leave it here, just in case
      // if (+page && +perPage) {
      //     page = (+page) - 1;
      //     lines = await OpeningLine.find().skip(page * +perPage).limit(+perPage).exec();
      // } else {
      //     throw new ApolloError("something wrong with Page and perPage")
      // }
      const limit = parseInt(process.env.OPENINGLINE_LIMIT) || 9;
      lines = await OpeningLine.aggregate([
        {
          $sample: { size: limit },
        },
      ]);
      //we do this because aggregate returns _id instead of id
      return lines.map((obj) => ({
        ...obj,
        id: obj._id,
      }));
    } catch (err) {
      console.log(err);
      throw new ApolloError("Internal Server Error");
    }
  }

  async incrementUseCount(lineId) {
    try {
      let line = await OpeningLine.findOneAndUpdate(
        { _id: lineId },
        {
          $inc: { useCount: 1 },
        },
        { new: true }
      );
      return line;
    } catch (err) {
      console.log(err);
      throw new ApolloError("Internal Server Error");
    }
  }
}

module.exports.OpeningLineAPI = OpeningLineAPI;
