import { http } from "common/services";
import { NextPageContext } from "next";
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

export default function Document() {
  const setInitialAuth = `
function getAuthCache() {
  if (window.sessionStorage.getItem("auth")) {
    try {
      return JSON.parse(window.sessionStorage.getItem("auth"));
    } catch (e) {
      return { success: false };
    }
  }
  return { success: false };
};
document.body.dataset.auth = getAuthCache();
  `;
  return (
    <Html>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialAuth }} />
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
