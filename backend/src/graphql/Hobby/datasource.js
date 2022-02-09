const { DataSource } = require("apollo-datasource");

const { Hobby } = require("../../schemas/Hobby/Hobby");

class HobbyAPI extends DataSource {
  constructor() {
    super();
  }

  async getAllHobbies() {
    const hobbies = await Hobby.find();

    return hobbies.map((hobby) => hobby.name);
  }
}

module.exports.HobbyAPI = HobbyAPI;
