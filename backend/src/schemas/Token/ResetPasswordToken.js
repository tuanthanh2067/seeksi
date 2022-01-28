const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600
  }
});

const ResetPasswordToken = mongoose.model("ResetPasswordTokens", tokenSchema);

module.exports = ResetPasswordToken;
