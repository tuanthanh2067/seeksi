const { User } = require("./User");
const { Token } = require("./Token");
const { Hobby } = require("./Hobby");

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Token.resolvers.queries,
    ...Hobby.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Token.resolvers.mutations,
  },
};

module.exports = resolvers;
