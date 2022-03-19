const { auth, userAuthentication, isAdmin } = require("./auth");

module.exports = (req) => {
  req.user = auth(req);

  return {
    req,
    userAuthentication,
    isAdmin,
  };
};
