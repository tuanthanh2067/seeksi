const { PubSub, withFilter } = require("graphql-subscriptions");

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
    subscribe: withFilter(
      () => pubsub.asyncIterator("CURRENT_USERS"),
      (payload, variables) => {
        return variables.partners.includes(payload.statusUpdated.key);
      }
    ),
  },
};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
