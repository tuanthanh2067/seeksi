const { DataSource } = require("apollo-datasource");

const userStatus = new Object();

class UserStatusAPI extends DataSource {
  constructor() {
    super();
  }

  updateUserStatus(userId, lastSeen) {
    userStatus[userId] = lastSeen;
  }
}

module.exports.UserStatusAPI = UserStatusAPI;
