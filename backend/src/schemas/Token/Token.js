const mongoose = require("mongoose");

const { Schema } = mongoose;

const TokenType = {
  PASSWORD_RESET: 'reset'
};

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  tokenType: {
    type: String,
    enum: [TokenType.PASSWORD_RESET],
    required: true
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

const Token = mongoose.model("Tokens", tokenSchema);
Token.TokenType = TokenType;

module.exports = Token;
