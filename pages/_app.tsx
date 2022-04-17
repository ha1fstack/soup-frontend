import { Theme, ThemeProvider } from "@emotion/react";
import { MediaContextProvider, Layout } from "components";
import { AppProps } from "next/app";
import Head from "next/head";
import { createBreakpoints } from "utils/createBreakpoints";

import "common/styles/reset.css";
import "common/styles/globals.css";

const theme: Theme = {
  breakpoints: createBreakpoints(),
  color: {
    primary: "#ff8a05",
    positive: "#ffffff",
    negative: "#23272b",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=0.9" />
      </Head>
      <ThemeProvider theme={theme}>
        <MediaContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MediaContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
