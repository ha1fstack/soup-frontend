import { css, Global, Theme, ThemeProvider } from "@emotion/react";
import { MediaContextProvider, Layout } from "components";
import NextApp, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import "common/styles/reset.css";
import "common/styles/globals.css";
import "swiper/css";

import { useLayoutEffect, useState } from "react";
import { NextPage } from "next";
import useAuth, { fetchAuth } from "hooks/useAuth";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { http } from "common/services";
import React from "react";

// suppress useLayoutEffect (and its warnings) when not running in a browser
if (typeof window === "undefined") React.useLayoutEffect = () => {};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/* -------------------------------------------------------------------------- */
/*                                   styles                                   */
/* -------------------------------------------------------------------------- */

const GlobalStyle = css`
  :root {
    --negative: #23272b;
    --negative2: #586672;

    --disabled: #ced3d7;

    --positive: #ffffff;
    --positive1: #f1f2f3;

    --background: #f8f9fa;
    --outline: #dadce0;

    --primary: #ff8a05;
    --primarylight: #ffeeda;
    --primarylight2: #fff8f1;
  }

  [data-theme="dark"] {
    --negative: #e7ebf0;
    --negative2: #b1b5b9;

    --disabled: #ced3d7;

    --positive: #23272b;
    --positive1: #2b3035;

    --background: #282c30;
    --outline: #35393d;

    --primary: #ff8a05;
    --primarylight: #1e2124;
    --primarylight2: #212428;
  }

  body {
    color: var(--negative);
    background-color: var(--background);
  }
`;

const theme: Theme = {};

/* -------------------------------------------------------------------------- */
/*                                     app                                    */
/* -------------------------------------------------------------------------- */

export default function App({
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

  // load dynamic api baseurl
  useLayoutEffect(() => {
    if (window)
      http.defaults.baseURL =
        window.location.protocol + "//" + window.location.host + "/api";
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SouP</title>
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthQuery initialAuth={initialAuth} />
            <Global styles={GlobalStyle} />
            <NextThemeProvider defaultTheme="system">
              <ThemeProvider theme={theme}>
                <MediaContextProvider>
                  {getLayout(<Component {...pageProps} />)}
                </MediaContextProvider>
              </ThemeProvider>
            </NextThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                     api                                    */
/* -------------------------------------------------------------------------- */

const AuthQuery = ({ initialAuth }: { initialAuth: any }) => {
  useAuth({
    initialData: initialAuth,
  });
  return null;
};

App.getInitialProps = async (context: AppContext) => {
  const initialProps = await NextApp.getInitialProps(context);

  if (context.ctx.req?.url && context.ctx.req.url.startsWith("/_next/data"))
    return initialProps;

  console.log(context.ctx.asPath);

  const cookie = context.ctx.req?.headers.cookie;
  const res = await fetchAuth(cookie);
  const initialAuth = res;

  return {
    ...initialProps,
    initialAuth,
  };
};
