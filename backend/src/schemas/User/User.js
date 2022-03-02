const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserType = require("../../enum/UserType");
const PotentialMatch = require("../PotentialMatch/PotentialMatch");

const { imageSchema } = require("../share/Image");
const { locationSchema } = require("../share/Location");
const { preferenceSchema } = require("./Preference");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  location: {
    type: locationSchema,
  },
  hobbies: {
    type: [String],
  },
  preference: {
    type: preferenceSchema,
  },
  avatar: {
    type: imageSchema,
  },
  photo: {
    type: [imageSchema],
  },
  role: {
    type: [String],
    required: true,
    default: [UserType.USER],
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.post("save", async (doc) => {
  const exists = await PotentialMatch.findOne({ user: doc._id });

  if (!exists) {
    await PotentialMatch.create({
      user: doc._id,
      potentialPartners: new Map(),
    });
  }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
