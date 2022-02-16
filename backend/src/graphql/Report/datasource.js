const { DataSource } = require("apollo-datasource");
const { UserInputError } = require("apollo-server-core");

const Report = require("../../schemas/Report/Report");
const User = require("../../schemas/User/User");
const { validateReportProblem } = require("../../utils/validatiion");

class ReportAPI extends DataSource {
  constructor() {
    super();
  }

  async createReport({
    title,
    problem,
    description = "",
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
