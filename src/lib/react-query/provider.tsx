"use client";

import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import React, { useMemo } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const config = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

const QueryClientProvider: React.FC<ProvidersProps> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(config), []);

  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
