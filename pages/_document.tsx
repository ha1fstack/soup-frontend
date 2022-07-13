import { mediaStyles } from "lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet preload prefetch"
          as="style"
          type="text/css"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="title" content="SouP" />
        <meta name="description" content="한눈에 보는 스터디와 프로젝트" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SouP" />
        <meta
          property="og:description"
          content="한눈에 보는 스터디와 프로젝트"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png"`}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
      </Head>
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
