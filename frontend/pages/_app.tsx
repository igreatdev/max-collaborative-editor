import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// import AuthGuard from '@/components/layouts/auth-guard';

import 'react-toastify/dist/ReactToastify.css';
import '@/scss/app.scss';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClientContext = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = React.useState(() => queryClientContext);
  // const {data: siteOptions, isLoading} = useGetSiteOptionsQuery();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position={'bottom'} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
