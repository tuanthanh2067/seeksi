const { DataSource } = require("apollo-datasource");

class GameRoomAPI extends DataSource {
  constructor() {
    super();
  }
}

module.exports.GameRoomAPI = GameRoomAPI;
