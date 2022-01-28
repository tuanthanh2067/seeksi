const { DataSource } = require("apollo-datasource");

const User = require("../../schemas/User/User");

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
  async findUserByEmail(email) {
    const user = await User.findOne({ email: email });

    if (!user) {
      // spit out an error
      console.log("There is no such user!");
    }

    return user;
  }

  async signup({ firstName, lastName, email, password, dob, sex }) {
    const user = await User.findOne({ email: email });

    if (user) {
      // spit out an error
      console.log("user is already existed");
    }

    const newUser = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      dob: dob,
      sex: sex,
    });

    await newUser.save();

    return newUser;
  }
}

module.exports.UserAPI = UserAPI;
