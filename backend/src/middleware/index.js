const { auth, userAuthentication } = require("./auth");

module.exports = (req) => {
  req.user = auth(req);

  return {
    req,
    userAuthentication,
  };
};
