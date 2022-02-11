const { MatchGender } = require("../enum/MatchGender");

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
  //only make and female for sex
  console.log("validate Sex" + Object.keys(MatchGender).includes(sex));
  return Object.keys(MatchGender).includes(sex);
};

const validateGenderPreference = (gender) => {
  console.log("validate gender" + Object.keys(MatchGender).includes(sex));
  return Object.keys(MatchGender).includes(sex);
};

module.exports = {
  validateEmail,
  validatePassword,
  validateSex,
};
