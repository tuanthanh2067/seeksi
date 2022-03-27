const { auth, userAuthentication, adminAuthentication } = require("./auth");

module.exports = (req) => {
  req.user = auth(req);

  return {
    req,
    userAuthentication,
    adminAuthentication,
  };
};
