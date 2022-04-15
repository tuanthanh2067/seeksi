const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const express = require("express");
const { createServer } = require("http");
const { graphqlUploadExpress } = require("graphql-upload");
const Mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

require("dotenv").config();
const { typeDefs, resolvers, datasources } = require("./graphql");

// middleware
const middleware = require("./middleware/index");

const PORT = process.env.PORT || 4000;

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
  playingStatusAPI: new datasources.PlayingStatusAPI(),
  openingLineAPI: new datasources.OpeningLineAPI(),
  imageAPI: new datasources.ImageAPI(),
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

  app.use(
    graphqlUploadExpress({ maxFiles: process.env.MAX_IMAGE_UPLOAD || 9 })
  );

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const graphQLLandingPage =
    process.env.NODE_ENV === "development"
      ? ApolloServerPluginLandingPageLocalDefault()
      : ApolloServerPluginLandingPageDisabled();

  const server = new ApolloServer({
    schema,
    dataSources,
    context: ({ req }) => {
      return { ...middleware(req) };
    },
    plugins: [
      graphQLLandingPage,
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    uploads: true,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  if (process.env.NODE_ENV === "development") {
    console.log(`
    🚀  Server ready at http://localhost:4000${server.graphqlPath}
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/
  `);
  } else {
    console.log("Server is running on production");
  }
}

startApolloSever();
