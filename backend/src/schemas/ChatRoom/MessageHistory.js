const mongoose = require("mongoose");
const { Schema } = mongoose;

const { messageSchema } = require("./Message");

const messageHistorySchema = new Schema({
  key: {
    type: String,
  },
  messages: {
    type: [messageSchema],
  },
});

module.exports.messageHistorySchema = messageHistorySchema;
