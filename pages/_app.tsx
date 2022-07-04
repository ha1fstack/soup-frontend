import { css, Global, Theme, ThemeProvider } from "@emotion/react";
import { Error, DefaultPageLayout } from "components";
import NextApp, { AppContext } from "next/app";
import Head from "next/head";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from "react-query";

import "common/styles/reset.css";
import "common/styles/globals.css";

import "swiper/css";
import "swiper/css/effect-fade";

import { useLayoutEffect, useState } from "react";
import { useAuth } from "lib/hooks";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { http } from "common/services";
import React from "react";
import { Provider } from "jotai";
import {
  breakpoints,
  isDevEnv,
  MediaContextProvider,
  WithAuth,
} from "lib/utils";
import { CustomAppProps, IAuthData } from "types";
import axios from "axios";

// suppress react query logging
if (isDevEnv)
  setLogger({
    log: () => {},
    warn: () => {},
    error: () => {},
  });

// suppress useLayoutEffect (and its warnings) when not running in a browser
if (typeof window === "undefined") React.useLayoutEffect = () => {};

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

  :root {
    ${breakpoints.at("sm")} {
      font-size: 56.25%;
    }
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

const AuthQuery = ({ initialAuth }: { initialAuth: any }) => {
  useAuth({
    initialData: initialAuth,
  });
  return null;
};

export default function App({
  Component,
  pageProps,
  initialAuth,
}: CustomAppProps & { initialAuth: IAuthData }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            ...(isDevEnv && { retry: 0 }),
          },
        },
      })
  );

  // load dynamic api baseurl
  useLayoutEffect(() => {
    if (window)
      http.defaults.baseURL =
        window.location.protocol + "//" + window.location.host + "/api";
  }, []);

  const getLayout =
    Component.getLayout ||
    ((page: React.ReactElement) => (
      <DefaultPageLayout>{page}</DefaultPageLayout>
    ));

  const page = (
    <WithAuth authorized={Component.authorized}>
      {({ auth, forbidden }) => {
        if (!auth)
          return (
            <DefaultPageLayout>
              <Error status={500} />
            </DefaultPageLayout>
          );
        if (pageProps.error)
          return (
            <DefaultPageLayout>
              <Error status={pageProps.error} />
            </DefaultPageLayout>
          );
        if (forbidden) return <DefaultPageLayout></DefaultPageLayout>;
        return <>{getLayout(<Component {...pageProps} />)}</>;
      }}
    </WithAuth>
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SouP</title>
      </Head>
      {/* jotai provider */}
      <Provider>
        {/* react query provider */}
        <QueryClientProvider client={queryClient}>
          {/* react query hydration provider */}
          <Hydrate state={pageProps.dehydratedState}>
            {/* auth */}
            <AuthQuery initialAuth={initialAuth} />
            {/* global styles */}
            <Global styles={GlobalStyle} />
            {/* next-themes provider */}
            <NextThemeProvider defaultTheme="system">
              {/* emotionjs provider */}
              <ThemeProvider theme={theme}>
                {/* fresnel provider */}
                <MediaContextProvider>{page}</MediaContextProvider>
              </ThemeProvider>
            </NextThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                     api                                    */
/* -------------------------------------------------------------------------- */

App.getInitialProps = async (context: AppContext) => {
  const {
    ctx: { req, res },
  } = context;

  const initialProps = await NextApp.getInitialProps(context);

  try {
    if (req?.url && req.url.startsWith("/_next/")) return initialProps;

    const cookie = req?.headers.cookie;

    const ssHttp = axios.create({
      baseURL: process.env.API_URL,
      headers: { ...(cookie && { cookie }) },
    });

    const initialAuth = (
      await ssHttp.get("/auth", {
        headers: { ...(cookie && { cookie }) },
      })
    ).data;

    return {
      ...initialProps,
      initialAuth,
    };
  } catch (e) {
    return initialProps;
  }
};
