const MatchGender = require("../enum/MatchGender");
const ReportProblem = require("../enum/ReportProblem");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
  return password.length >= 12 && password.length < 30;
};

const validateSex = (sex) => {
  return Object.values(MatchGender).includes(sex);
};

const validateGenderPreference = (gender) => {
  return Object.values(MatchGender).includes(sex);
};

const validateReportProblem = (problem) => {
  return Object.values(ReportProblem).includes(problem);
};

module.exports = {
  validateEmail,
  validatePassword,
  validateSex,
  validateGenderPreference,
  validateReportProblem,
};
