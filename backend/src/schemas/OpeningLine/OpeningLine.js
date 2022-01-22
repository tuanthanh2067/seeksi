const mongoose = require("mongoose");
const { Schema } = mongoose;

const openingLineSchema = new Schema({
  lineID: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  useCount: {
    type: Number,
    default: 0,
  },
});

const OpeningLine = mongoose.model("OpeningLines", openingLineSchema);

module.exports = OpeningLine;
