const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  questionID: {
    type: String,
    unique: true,
  },
  question: {
    type: String,
  },
  topics: {
    type: [String],
  },
});

const Question = mongoose.model("Questions", questionSchema);

module.exports = Question;
