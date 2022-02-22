const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const queries = {};

const mutations = {
  updateMyStatus: (_, args, { dataSources, req, userAuthentication }) => {
    userAuthentication(req.user);

    const userId = req.user.userId;
    const lastSeen = Date.now();

    dataSources.userStatusAPI.updateUserStatus(userId, lastSeen);

    const status = {
      userId,
      lastSeen,
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
        return variables.partners.includes(payload.statusUpdated.userId);
      }
    ),
  },
};

module.exports.resolvers = {
  queries,
  mutations,
  subscriptions,
};
