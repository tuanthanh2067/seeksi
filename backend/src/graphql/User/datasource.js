const { DataSource } = require("apollo-datasource");

class UserAPI extends DataSource {
  constructor() {
    super();
  }

  /**
   * Find a user in the database by their email
   * @param {String} email
   * @returns {Object}
   *
   */
  async findUser(email) {
    return {
      id: "12345",
      email: email,
      password: "Pa$$w0rd!",
      loggedIn: false,
      firstName: "Some",
      lastName: "User",
    };
  }
}

module.exports.UserAPI = UserAPI;
