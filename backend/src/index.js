const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const Mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");

require("dotenv").config();
const { typeDefs, resolvers, datasources } = require("./graphql");

// middleware
const middleware = require("./middleware/index");

// set up data sources
const dataSources = () => ({
  userAPI: new datasources.UserAPI(),
  tokenAPI: new datasources.TokenAPI(),
  hobbyAPI: new datasources.HobbyAPI(),
  potentialMatchAPI: new datasources.PotentialMatchAPI(),
  matchAPI: new datasources.MatchAPI(),
  chatRoomAPI: new datasources.ChatRoomAPI(),
  reportAPI: new datasources.ReportAPI(),
  gameRoomAPI: new datasources.GameRoomAPI(),
  gameRequestAPI: new datasources.GameRequestAPI(),
  userStatusAPI: new datasources.UserStatusAPI(),
  openingLineAPI: new datasources.OpeningLineAPI(),
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "/",
    }
  );

  const server = new ApolloServer({
    schema,
    dataSources,
    context: ({ req }) => {
      return { ...middleware(req) };
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
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
