const mongoose = require("mongoose");
const { imageSchema } = require("../share/Image");

const { Schema } = mongoose;

const messageSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  sendBy: {
    type: String,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: "",
  },
  photos: {
    type: [imageSchema],
    default: [],
  },
});

module.exports.messageSchema = messageSchema;
