import { createContext } from "react";
import { ApolloClient, InMemoryCache, split } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const link = () => {
    const wsLink = new WebSocketLink({
      uri: "ws://localhost:4000/",
      options: {
        reconnect: true,
        connectionParams: {
          authorization: getToken() ? `Bearer ${getToken()}` : "",
        },
      },
    });

    const uploadLink = createUploadLink({
      uri: process.env.REACT_APP_GRAPHQL_URI,
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
