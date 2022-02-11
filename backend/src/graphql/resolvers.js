const { User } = require("./User");
const { Token } = require("./Token");
const { Hobby } = require("./Hobby");
const { PotentialMatch } = require("./PotentialMatch");

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Token.resolvers.queries,
    ...Hobby.resolvers.queries,
    ...PotentialMatch.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Token.resolvers.mutations,
    ...PotentialMatch.resolvers.mutations,
  },
};

module.exports = resolvers;
