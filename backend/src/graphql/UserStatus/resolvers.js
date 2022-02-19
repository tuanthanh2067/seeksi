const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const queries = {};

const mutations = {
  updateMyStatus: (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    const key = req.user.userId;
    const value = Date.now();

    dataSources.userStatusAPI.updateUserStatus(key, value);

    const status = {
      key,
      value,
    };

    pubsub.publish("CURRENT_USERS", {
      statusUpdated: status,
    });

    return status;
  },
};

const subscriptions = {
  statusUpdated: {
    subscribe: (_, args, context) => {
      return pubsub.asyncIterator("CURRENT_USERS");
    },
  },
};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
