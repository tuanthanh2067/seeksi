const { ApolloServer } = require("apollo-server");

const { typeDefs, resolvers } = require("./graphql");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`
    🚀  Server ready at ${url}
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/
  `);
});
