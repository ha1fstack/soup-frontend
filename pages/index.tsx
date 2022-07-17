import { Button, Flex, Section } from "common/atoms";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { createPageLayout } from "components";
import { breakpoints, handleError, Media } from "lib/utils";
import { CustomNextPage } from "types";
import {
  BannerView,
  HotFeaturedView,
  LoungeView,
  NewFeaturedView,
  ProjectsView,
} from "views/home";
import { frontFeaturedQueryContext } from "lib/queries";
import { css } from "@emotion/react";
import Link from "next/link";
import { MdOutlineSearch } from "react-icons/md";
import Head from "next/head";

const Home: CustomNextPage = () => {
  return (
    <>
      <Head>
        <meta name="title" content="SouP | 한눈에 보는 스터디와 프로젝트" />
        <meta
          name="description"
          content="흩어져 있는 스터디와 프로젝트 모집, 이젠 SouP에서 편하게 모아보세요. 관심 있는 프로젝트를 쉽게 찾고 간편하게 지원할 수 있어요."
        />
      </Head>
      <BannerView />
      <Section bleed css={{ borderTop: "0px" }}>
        <Media at="sm">
          <SearchButton />
        </Media>
        <Flex css={style.flexWrapper}>
          <HotFeaturedView />
          <NewFeaturedView />
        </Flex>
      </Section>
      <Section>
        <Flex css={style.flexWrapper}>
          <ProjectsView />
          <LoungeView />
        </Flex>
      </Section>
    </>
  );
};

Home.getLayout = createPageLayout({
  ignoreDefaultTopPadding: true,
});

export default Home;

const style = {
  flexWrapper: css({
    columnGap: "64px",
    rowGap: "24px",
    flexWrap: "wrap",
    "& > *": {
      [breakpoints.greaterThan("sm")]: { overflow: "hidden" },
    },
    "& > *:nth-of-type(1)": { flex: "3 1 480px" },
    "& > *:nth-of-type(2)": { flex: "2 1 320px" },
  }),
};

const SearchButton = () => (
  <Link passHref href="/projects">
    <Button
      variant="primary-outlined"
      as="a"
      css={{
        marginBottom: "24px",
        justifyContent: "space-between",
        marginTop: "-4px",
      }}
    >
      <span css={{ fontSize: "1.4rem" }}>프로젝트 찾아보기</span>
      <MdOutlineSearch />
    </Button>
  </Link>
);

export const getServerSideProps: GetServerSideProps = handleError(async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(...frontFeaturedQueryContext(undefined)),
    // queryClient.prefetchQuery("front/projects", fetchFrontProjects),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
