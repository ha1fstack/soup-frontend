import { Theme, ThemeProvider } from "@emotion/react";
import { MediaContextProvider, Layout } from "components";
import NextApp, { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query";
import { createBreakpoints } from "utils/createBreakpoints";

import "common/styles/reset.css";
import "common/styles/globals.css";
import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import { http } from "common/services";
import axios from "axios";
import useAuth, { fetchAuth } from "hooks/useAuth";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme: Theme = {
  breakpoints: createBreakpoints(),
  color: {
    primary: "#ff8a05",
    positive: "#ffffff",
    background: "#f8f9fa",
    negative: "#23272b",
  },
};

function MyApp({
  Component,
  pageProps,
  initialAuth,
}: AppPropsWithLayout & { initialAuth: any }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  const getLayout =
    Component.getLayout ||
    ((page: React.ReactElement) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=0.9" />
        <title>SouP</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthQuery initialAuth={initialAuth} />
          <ThemeProvider theme={theme}>
            <MediaContextProvider>
              {getLayout(<Component {...pageProps} />)}
            </MediaContextProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

const AuthQuery = ({ initialAuth }: { initialAuth: any }) => {
  useAuth({
    initialData: initialAuth,
  });
  return null;
};

MyApp.getInitialProps = async (context: AppContext) => {
  const initialProps = await NextApp.getInitialProps(context);

  if (context.ctx.req?.url && context.ctx.req.url.startsWith("/_next/data"))
    return initialProps;

  const cookie = context.ctx.req?.headers.cookie;
  const res = await fetchAuth(cookie);
  const initialAuth = res;

  console.log(context.ctx.req?.url);

  console.log("initialAuth:", initialAuth);
  return {
    ...initialProps,
    initialAuth,
  };
};

export default MyApp;
