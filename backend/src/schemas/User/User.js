const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const { imageSchema } = require("../share/Image");
const { locationSchema } = require("../share/Location");
const { preferenceSchema } = require("./Preference");
const { hobbySchema } = require("../Hobby/Hobby");

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
    type: String,
    required: true,
    default: "user",
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

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("Users", userSchema);

module.exports = User;
