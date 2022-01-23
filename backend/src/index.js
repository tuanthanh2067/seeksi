const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers, datasources } = require("./graphql");

// set up data sources
const dataSources = () => ({
  userAPI: new datasources.UserAPI(),
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen().then(({ url }) => {
  console.log(`
    🚀  Server ready at ${url}
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/
  `);
});
