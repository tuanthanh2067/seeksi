const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (id, email, role) => {
  const payload = {
    userID: id,
    email: email,
    role: role,
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: process.env.JWT_EXPIRE_IN || "3d",
  };

  return jwt.sign(payload, secret, options);
};

module.exports = {
  createToken,
};
