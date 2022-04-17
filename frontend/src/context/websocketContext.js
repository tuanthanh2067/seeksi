import { createContext } from "react";
import { ApolloClient, InMemoryCache, split } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { createUploadLink } from "apollo-upload-client";

const WebSocketContext = createContext();

const API_URI = process.env.REACT_APP_GRAPHQL_URI || "localhost:4000";
const ENV = process.env.REACT_APP_ENV || "development";

const WebSocketProvider = ({ children }) => {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const link = () => {
    const wsLink = new GraphQLWsLink(
      createClient({
        url: ENV === "development" ? `ws://${API_URI}` : `wss://${API_URI}/`,
      })
    );

    const uploadLink = createUploadLink({
      uri: ENV === "development" ? `http://${API_URI}` : `https://${API_URI}`,
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: getToken() ? `Bearer ${getToken()}` : "",
        },
      };
    });

    return split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(uploadLink)
    );
  };

  const apolloClient = new ApolloClient({
    link: link(),
    cache: new InMemoryCache(),
  });

  apolloClient.onResetStore(async () => {
    apolloClient.setLink(link());
  });

  return (
    <WebSocketContext.Provider value={{ apolloClient }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
