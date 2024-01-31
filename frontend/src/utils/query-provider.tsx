'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

function QueryProviders({ children }: Readonly<React.PropsWithChildren>) {
  const queryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 3,
        refetchOnMount: 'always',
        refetchOnWindowFocus: 'always',
        refetchOnReconnect: 'always',
        refetchIntervalInBackground: false,
      },
      mutations: {
        retry: 3,
      },
    },
  };
  const client = new QueryClient(queryClientConfig);

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default QueryProviders;
