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
  },
  content: {
    type: String,
  },
  photo: {
    type: imageSchema,
    default: null,
  },
});

module.exports.messageSchema = messageSchema;
