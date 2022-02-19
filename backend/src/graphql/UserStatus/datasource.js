const { DataSource } = require("apollo-datasource");

const userStatus = new Object();

class UserStatusAPI extends DataSource {
  constructor() {
    super();
  }

  updateUserStatus(key, value) {
    userStatus[key] = value;
  }
}

module.exports.UserStatusAPI = UserStatusAPI;
