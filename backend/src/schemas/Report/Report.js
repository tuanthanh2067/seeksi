const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReportStatusEnum = require("../../enum/ReportStatus");

const reportSchema = new Schema({
  title: {
    type: String,
  },
  problem: {
    type: String,
  },
  description: {
    type: String,
  },
  reportedUserID: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  reporterID: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  status: {
    type: String,
    enum: [
      ReportStatusEnum.PENDING,
      ReportStatusEnum.RESOLVED,
      ReportStatusEnum.SKIPPED,
    ],
    default: ReportStatusEnum.PENDING,
  },
});

const Report = mongoose.model("Reports", reportSchema);

module.exports = Report;
