const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  reportID: {
    type: String,
    unique: true,
  },
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
    type: String,
  },
  reporterID: {
    type: String,
  },
});

const Report = mongoose.model("Reports", reportSchema);

module.exports = Report;
