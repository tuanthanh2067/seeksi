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
  return sex === "male" || sex === "female";
};

const validateGenderPreference = (gender) => {
  return sex === "male" || sex === "female" || sex === "everyone";
};

module.exports = {
  validateEmail,
  validatePassword,
  validateSex,
};
