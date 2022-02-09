const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const Mongoose = require("mongoose");

require("dotenv").config();
const { typeDefs, resolvers, datasources } = require("./graphql");

// middleware
const middleware = require("./middleware/index");

// set up data sources
const dataSources = () => ({
  userAPI: new datasources.UserAPI(),
  tokenAPI: new datasources.TokenAPI(),
  hobbyAPI: new datasources.HobbyAPI(),
});

Mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,

  // we may need this enabled when having problem with mongoose
  // useFindAndModify: false,
  // useUnifiedTopology: true,
})
  .then(() => {
    console.log("    😂  Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

async function startApolloSever() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: ({ req }) => {
      return middleware(req);
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`
    🚀  Server ready at http://localhost:4000${server.graphqlPath}
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/
  `);
}

startApolloSever();
