const { AuthenticationError } = require("apollo-server-core");
const jwt = require("jsonwebtoken");

/**
 * Find a user in the database by their email
 * @param {String} bearerToken
 * @returns {Object}
 *
 */
module.exports.auth = (req) => {
  const bearerToken = req.headers.authorization;
  let auth = {
    isAuth: false,
  };
  if (!bearerToken) {
    return { auth };
  }

  const token = bearerToken.split(" ");
  if (!token) {
    return { auth };
  }

  let decodeToken;

  try {
    //   decodeToken: userId, email, role
    decodeToken = jwt.verify(token[1], process.env.JWT_SECRET);
  } catch (err) {
    return { auth };
  }

  auth = {
    isAuth: true,
    ...decodeToken,
  };
  return auth;
};

module.exports.userAuthentication = (user) => {
  if (!user.isAuth) {
    throw new AuthenticationError("User is not authenticated");
  }
};
