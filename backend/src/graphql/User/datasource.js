const { DataSource } = require("apollo-datasource");
const {
  UserInputError,
  ApolloError,
  AuthenticationError,
} = require("apollo-server-core");
const bcrypt = require("bcryptjs");

const User = require("../../schemas/User/User");

const { createToken } = require("../../utils/jwt");
const geocoder = require("../../utils/geo_location");

const {
  validateEmail,
  validatePassword,
  validateSex,
} = require("../../utils/validatiion");

require("dotenv").config();

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

    return {
      ...user._doc,
      password: null,
      dob: user.dob.toISOString(),
    };
  }
  //login function, if user credentials are valid, return jwt token
  async login(email, password) {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          return createToken(user.id, user.email, user.role);
        } else {
          throw new UserInputError("Password is not correct");
        }
      }
      //currently only returns this err message
      throw new UserInputError("User does not exist");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async signup({ firstName, lastName, email, password, dob, sex }) {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        // spit out an error
        throw new UserInputError("User is already existed");
      }

      // validation
      if (!validateEmail(email)) throw new UserInputError("Email is not valid");
      if (!validatePassword(password))
        throw new UserInputError(
          "Password must be between 12 and 30 characters"
        );
      if (!validateSex(sex)) throw new UserInputError("Sex is not valid");
      // TODO: validate birthday

      const saltRound = parseInt(process.env.SALT_ROUND) || 12;

      const hash = await bcrypt.hash(password, saltRound);
      const newUser = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hash,
        dob: dob,
        sex: sex,
      });

      await newUser.save();
      return createToken(newUser.id, email, newUser.role);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async resetPassword({ userId, password }) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User doesn't exist.");
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;

    // TODO: Notify password change by email

    return await user.save();
  }

  async setUserLocation(
    { city = "", province = "", longitude = 0, latitude = 0 },
    userID
  ) {
    // location received can be either city and province || longitude and latitude

    if (!city && !province && longitude === 0 && latitude === 0) {
      throw new UserInputError("Invalid location or coordinates");
    }

    const user = await User.findById(userID);

    if (!user) {
      throw new AuthenticationError("Can not find user");
    }

    if (!user.location) {
      user.location = {
        city: city,
        province: province,
        longitude: longitude,
        latitude: latitude,
      };
    }

    if (city !== "" && province !== "") {
      const res = await geocoder.geocode(`${city} ${province}`);
      longitude = res[0].longitude;
      latitude = res[0].latitude;
    }

    user.location.city = city || user.location.city;
    user.location.province = province || user.location.province;
    user.location.longitude = longitude ? longitude : user.location.longitude;
    user.location.latitude = latitude ? latitude : user.location.latitude;

    return await user.save();
  }

  async getUserProfileById(userId) {
    const user = await User.findById(userId).exec();

    if (user) {
      return {
        ...user._doc,
        password: null,
        dob: user.dob.toISOString(),
      };
    } else {
      throw new UserInputError("User not found");
    }
  }

  async deleteAccountById(userId) {
    try {
      const user = await User.findById(userId).exec();

      if (user) {
        user.isDisabled = true;
      } else {
        throw new Error("User doesn't exist");
      }
      await user.save();
    } catch (err) {
      console.error(err);
      throw new ApolloError("Internal server error");
    }
  }
}

module.exports.UserAPI = UserAPI;
