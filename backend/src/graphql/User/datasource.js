const { DataSource } = require("apollo-datasource");
const {
  UserInputError,
  ApolloError,
  AuthenticationError,
} = require("apollo-server-core");
const bcrypt = require("bcryptjs");

const User = require("../../schemas/User/User");
const preferenceSchema = require("../../schemas/User/Preference");

const { createToken } = require("../../utils/jwt");

const geocoder = require("../../utils/geo_location");

const {
  validateEmail,
  validatePassword,
  validateSex,
  validateGenderPreference,
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
    { city = "", province = "", country = "", longitude = 0, latitude = 0 },
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
        country: country,
        city: city,
        province: province,
        longitude: longitude,
        latitude: latitude,
      };
    }

    if (city !== "" && province !== "") {
      const res = await geocoder.geocode(`${city} ${province} ${country}`);
      longitude = res[0].longitude;
      latitude = res[0].latitude;
    }
    user.location.country = country || user.location.country;
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

  async editUserById(userId, updateUserObject) {
    try {
      let errors = [];
      for (const [key, value] of Object.entries(updateUserObject)) {
        if (
          (key == "shortTerm" || key == "longTerm") &&
          typeof value != "boolean"
        ) {
          errors.push(key + " must be a Boolean");
          continue;
        }
        if (!value && typeof value != "boolean") {
          errors.push(key + " is empty");
        }
      }
      if (!validateGenderPreference(updateUserObject.genderPref)) {
        errors.push("gender preference is not valid");
      }
      if (!validateSex(updateUserObject.sex)) {
        errors.push("sex is not valid");
      }
      if (errors.length == 0) {
        let user = await User.findById(userId).catch((err) => {
          throw err;
        });

        //maybe we could make this a separate function?
        //needs more validation checks
        user.bio = updateUserObject.bio;
        user.sex = updateUserObject.sex;
        user.hobbies = updateUserObject.hobbies;
        //sub schema, needs to be initialized
        // (maybe we should do this when user gets created)
        if (user.preference == null) {
          user.preference = {
            gender: null,
            distance: 0,
            minAge: 0,
            maxAge: 0,
            longTerm: false,
            shortTerm: false,
          };
        }
        user.preference.gender = updateUserObject.genderPref;
        user.preference.distance = updateUserObject.distance;
        user.preference.minAge = updateUserObject.minAge;
        user.preference.maxAge = updateUserObject.maxAge;
        user.preference.longTerm = updateUserObject.longTerm;
        user.preference.shortTerm = updateUserObject.shortTerm;
        await user.save();
        await this.setUserLocation(updateUserObject, userId);
      }
      return {
        errors: errors,
      };
    } catch (err) {
      console.log(err);
      throw new ApolloError("edit user error" + err);
    }
  }

  async setAvatar({ userId, avatar }) {
    const user = await User.findById(userId);
    user.avatar = avatar;
    await user.save();
  }

  async setPhotos({ userId, photos }) {
    const user = await User.findById(userId);
    user.photo = photos;
    await user.save();
  }
}

module.exports.UserAPI = UserAPI;
