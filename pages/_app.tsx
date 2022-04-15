import "../styles/reset.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components";
import { Theme, ThemeProvider } from "@emotion/react";
import { createBreakpoints } from "utils/createBreakpoints";
import { MediaContextProvider } from "components/Media";

const theme: Theme = {
  breakpoints: createBreakpoints(),
  color: {
    primary: "#fa8705",
    positive: "#ffffff",
    negative: "#23272b",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <MediaContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MediaContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
