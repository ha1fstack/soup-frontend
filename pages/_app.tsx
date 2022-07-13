import { css, Global, Theme, ThemeProvider } from "@emotion/react";
import { DefaultPageLayout, Error } from "components";
import NextApp, { AppContext } from "next/app";
import Head from "next/head";
import { Hydrate, QueryClientProvider, setLogger } from "react-query";

import "common/styles/globals.css";
import "common/styles/reset.css";

import "swiper/css";
import "swiper/css/effect-fade";

import "react-loading-skeleton/dist/skeleton.css";

import { Provider } from "jotai";
import { useAuth } from "lib/hooks";
import { createQueryClient, http } from "lib/services";
import {
  breakpoints,
  isDevEnv,
  MediaContextProvider,
  WithAuth,
} from "lib/utils";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { useLayoutEffect, useState } from "react";
import { CustomAppProps, IAuthData } from "types";
import Script from "next/script";

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

    .react-loading-skeleton {
    }
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

  .react-loading-skeleton {
    --base-color: var(--background);
    --highlight-color: var(--positive1);
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
  const [queryClient] = useState(() => createQueryClient());

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
      {!isDevEnv && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
          </Script>
        </>
      )}
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
    if (!req || req?.url?.startsWith("/_next/")) return initialProps;

    const cookie = req?.headers.cookie;

    const initialAuth = (
      await http.get("/auth", {
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
