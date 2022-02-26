const { DataSource } = require("apollo-datasource");

const playingStatus = new Object();

class PlayingStatusAPI extends DataSource {
  constructor() {
    super();
  }

  updatePlayingStatus(userId, playing) {
    playingStatus[userId] = playing;
  }

  isPlaying(userId) {
    return playingStatus[userId];
  }
}

module.exports.PlayingStatusAPI = PlayingStatusAPI;
