const mongoose = require("mongoose");
const { Schema } = mongoose;

const potentialPartnerSchema = require("./PotentialPartner");

const potentialMatch = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  potentialPartners: {
    type: Schema.Types.Map,
    of: potentialPartnerSchema,
  },
});

const PotentialMatch = mongoose.model("PotentialMatches", potentialMatch);

module.exports = PotentialMatch;
