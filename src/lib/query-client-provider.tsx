"use client";

import {
  isServer,
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import React from "react";

// Define the type for the component props
interface ProvidersProps {
  children: React.ReactNode;
}

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

const makeQueryClient = () => new QueryClient(config);

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(): QueryClient {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const QueryClientProvider: React.FC<ProvidersProps> = ({ children }) => {
  const queryClient = getQueryClient();

  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
