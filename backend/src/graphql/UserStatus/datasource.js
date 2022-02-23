const { DataSource } = require("apollo-datasource");

const userStatus = new Object();

class UserStatusAPI extends DataSource {
  constructor() {
    super();
  }

  updateUserStatus(userId, lastSeen) {
    userStatus[userId] = lastSeen;
  }

  isOnline(userId) {
    // user status will be updated every 30s
    return (Date.now() - userStatus[userId]) / 1000 <= 30;
  }
}

module.exports.UserStatusAPI = UserStatusAPI;
