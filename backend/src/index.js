const { ApolloServer } = require("apollo-server");
const Mongoose = require("mongoose");
require("dotenv").config();

const { typeDefs, resolvers, datasources } = require("./graphql");

// set up data sources
const dataSources = () => ({
  userAPI: new datasources.UserAPI(),
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

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen().then(({ url }) => {
  console.log(`
    🚀  Server ready at ${url}
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/
  `);
});
