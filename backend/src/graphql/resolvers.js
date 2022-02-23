const { GraphQLUpload } = require("graphql-upload");
const { User } = require("./User");
const { Token } = require("./Token");
const { Hobby } = require("./Hobby");
const { PotentialMatch } = require("./PotentialMatch");
const { Match } = require("./Match");
const { ChatRoom } = require("./ChatRoom");
const { Report } = require("./Report");
const { GameRoom } = require("./GameRoom");
const { GameRequest } = require("./GameRequest");
const { UserStatus } = require("./UserStatus");
const { OpeningLine } = require("./OpeningLine");
const { Upload } = require("./Upload");

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...User.resolvers.queries,
    ...Token.resolvers.queries,
    ...Hobby.resolvers.queries,
    ...PotentialMatch.resolvers.queries,
    ...Match.resolvers.queries,
    ...ChatRoom.resolvers.queries,
    ...Report.resolvers.queries,
    ...GameRoom.resolvers.queries,
    ...GameRequest.resolvers.queries,
    ...UserStatus.resolvers.queries,
    ...OpeningLine.resolvers.queries,
    ...Upload.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Token.resolvers.mutations,
    ...PotentialMatch.resolvers.mutations,
    ...Match.resolvers.mutations,
    ...ChatRoom.resolvers.mutations,
    ...Report.resolvers.mutations,
    ...GameRoom.resolvers.mutations,
    ...GameRequest.resolvers.mutations,
    ...OpeningLine.resolvers.mutations,
    ...Upload.resolvers.mutations,
  },
  Subscription: {
    ...ChatRoom.resolvers.subscriptions,
    ...GameRoom.resolvers.subscriptions,
    ...GameRequest.resolvers.subscriptions,
    ...UserStatus.resolvers.subscriptions,
  },
};

module.exports = resolvers;
