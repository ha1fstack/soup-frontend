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
        <meta name="title" content="스프 | 흩어져 있는 스터디와 프로젝트가 모여있는 곳" />
        <meta name="description" content="곳곳에 퍼져 있는 스터디와 프로젝트 모집글, 이젠 스프에서 편하게 모아보세요. 관심 있는 프로젝트를 태그로 쉽게 찾고 지원 양식도 만들어드려요." />
        <meta name="keywords" content="스터디, 프로젝트, 사이드 프로젝트,사이드프로젝트, 스터디 모집 사이트, 프로젝트 모집 사이트, 토이 프로젝트, 프로젝트 찾기, 스터디 모집 플랫폼, 프로젝트 모집 플랫폼, 스프, SouP, hola ,렛플 , okky, 인프런,  캠퍼스픽"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="스프" />
        <meta
          property="og:description"
          key="og:description"
          content="흩어져 있는 스터디와 프로젝트가 모여있는 곳"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
