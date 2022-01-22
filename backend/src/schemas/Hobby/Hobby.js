const mongoose = require("mongoose");
const { Schema } = mongoose;

const hobbySchema = new Schema({
  hobbyID: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
});

const Hobby = mongoose.model("Hobbies", hobbySchema);

module.exports = Hobby;
