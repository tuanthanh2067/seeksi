const { DataSource } = require("apollo-datasource");
const { UserInputError } = require("apollo-server-core");

const Report = require("../../schemas/Report/Report");
const User = require("../../schemas/User/User");
const { validateReportProblem } = require("../../utils/validatiion");

class ReportAPI extends DataSource {
  constructor() {
    super();
  }

  async getReport(page = 1, perPage = 10) {
    try {
      let reports = [];
      if (+page && +perPage) {
        page = +page - 1;
        reports = await Report.find()
          .skip(page * +perPage)
          .limit(+perPage)
          .exec();
      } else {
        throw new ApolloError("something wrong with Page and perPage");
      }

      return reports;
    } catch (err) {
      throw new ApolloError("Internal Server Error");
    }
  }

  async createReport({
    title,
    problem,
    description,
    reportedUserID,
    reporterID,
  }) {
    if (!title) {
      throw new UserInputError("Invalid report title!");
    }

    if (!validateReportProblem(problem)) {
      throw new UserInputError("Invalid report problem!");
    }

    const reportedUser = await User.findById(reportedUserID);

    if (!reportedUser) {
      throw new UserInputError("Reported user is not found!");
    }

    const reporter = await User.findById(reporterID);

    if (!reporter) {
      throw new UserInputError("User is not found!");
    }

    await Report.create({
      title,
      problem,
      description,
      reportedUserID,
      reporterID,
    });
  }
}

module.exports.ReportAPI = ReportAPI;
