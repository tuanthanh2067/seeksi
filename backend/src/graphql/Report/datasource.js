const { DataSource } = require("apollo-datasource");
const { UserInputError, ApolloError } = require("apollo-server-core");

const Report = require("../../schemas/Report/Report");
const User = require("../../schemas/User/User");
const { validateReportProblem } = require("../../utils/validatiion");

const { objectIdWithTimestamp } = require("../../utils/mongoose");

const ReportStatusEnum = require("../../enum/ReportStatus");
const ReportProblemEnum = require("../../enum/ReportProblem");

class ReportAPI extends DataSource {
  constructor() {
    super();
  }

  async getReports(
    page = 1,
    perPage = 10,
    fromDate = "1980/01/01",
    toDate = new Date(),
    status,
    problem,
    name = ""
  ) {
    try {
      if (status) status = [status];
      else
        status = [
          ReportStatusEnum.PENDING,
          ReportStatusEnum.RESOLVED,
          ReportStatusEnum.SKIPPED,
        ];
      if (problem) problem = [problem];
      else
        problem = [
          ReportProblemEnum.FAKE_ACCOUNT,
          ReportProblemEnum.HARASSMENT,
          ReportProblemEnum.INAPPROPRIATE_CONTENT,
          ReportProblemEnum.OTHERS,
        ];

      const condition = {
        _id: {
          $gte: objectIdWithTimestamp(fromDate),
          $lte: objectIdWithTimestamp(toDate),
        },
        status: {
          $in: status,
        },
        problem: {
          $in: problem,
        },
      };

      if (name) {
        // search user with name to get id's
        const regex = new RegExp(name, "i");
        const users = await User.find({
          $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
          ],
        }).select({ _id: 1 });

        // convert object id to id
        const ids = users.map((u) => u._id.toString());

        // set conditions
        condition.$or = [
          { reportedUserID: { $in: ids } },
          { reporterID: { $in: ids } },
        ];
      }

      let reports = [];
      if (+page && +perPage) {
        page = +page - 1;
        reports = await Report.find(condition)
          .sort({ _id: -1 })
          .skip(page * +perPage)
          .limit(+perPage)
          .exec();

        reports = reports.map((r) => {
          return {
            ...r.toObject(),
            id: r._id.toString(),
            createdAt: r._id.getTimestamp(),
          };
        });
      } else {
        throw new ApolloError("something wrong with Page and perPage");
      }

      return reports;
    } catch (err) {
      throw new ApolloError("Internal Server Error");
    }
  }

  async getReportById(reportId) {
    try {
      const report = await Report.findById(reportId);
      report.createdAt = report._id.getTimestamp();

      return report;
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
