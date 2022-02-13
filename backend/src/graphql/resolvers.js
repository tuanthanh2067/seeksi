const { User } = require("./User");
const { Token } = require("./Token");
const { Hobby } = require("./Hobby");
const { PotentialMatch } = require("./PotentialMatch");
const { Match } = require("./Match");
const { ChatRoom } = require("./ChatRoom");

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Token.resolvers.queries,
    ...Hobby.resolvers.queries,
    ...PotentialMatch.resolvers.queries,
    ...Match.resolvers.queries,
    ...ChatRoom.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Token.resolvers.mutations,
    ...PotentialMatch.resolvers.mutations,
    ...Match.resolvers.mutations,
    ...ChatRoom.resolvers.mutations,
  },
};

module.exports = resolvers;
