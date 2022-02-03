const { auth, isAuthenticated } = require("./auth");

module.exports = (req) => {
  req.user = auth(req);

  return {
    req,
    isAuthenticated,
  };
};
