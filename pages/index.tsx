import { Flex, Section } from "common/atoms";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { createPageLayout } from "components";
import { breakpoints, handleError } from "lib/utils";
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

const Home: CustomNextPage = () => {
  return (
    <>
      <BannerView />
      <Section bleed css={{ borderTop: "0px" }}>
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
    rowGap: "36px",
    flexWrap: "wrap",
    "& > *": {
      [breakpoints.greaterThan("sm")]: { overflow: "hidden" },
    },
    "& > *:nth-of-type(1)": { flex: "3 1 480px" },
    "& > *:nth-of-type(2)": { flex: "2 1 320px" },
  }),
};

export const getServerSideProps: GetServerSideProps = handleError(async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(...frontFeaturedQueryContext()),
    // queryClient.prefetchQuery("front/projects", fetchFrontProjects),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
