const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, mocks: resolvers });

server.listen().then(({ url }) => {
  console.log(`
    🚀  Server ready at ${url}
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/
  `);
});
