import { Theme, ThemeProvider } from "@emotion/react";
import { MediaContextProvider, Layout } from "components";
import { AppProps } from "next/app";
import Head from "next/head";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { createBreakpoints } from "utils/createBreakpoints";

import "common/styles/reset.css";
import "common/styles/globals.css";
import { useState } from "react";

const theme: Theme = {
  breakpoints: createBreakpoints(),
  color: {
    primary: "#ff8a05",
    positive: "#ffffff",
    negative: "#23272b",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=0.9" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <MediaContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MediaContextProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
