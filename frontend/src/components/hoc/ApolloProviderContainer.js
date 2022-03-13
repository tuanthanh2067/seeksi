import { ApolloProvider } from "@apollo/client";
import { useContext } from "react";

import { WebSocketContext } from "../../context/websocketContext";

const ApolloProviderContainer = ({ children }) => {
  const { apolloClient } = useContext(WebSocketContext);

  return (
    <>
      {apolloClient && (
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      )}
    </>
  );
};

export default ApolloProviderContainer;
