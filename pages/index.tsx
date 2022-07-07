import { Flex, Section } from "common/atoms";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { createPageLayout } from "components";
import { injectSession } from "lib/utils";
import { CustomNextPage } from "types";
import { fetchFrontFeatured } from "lib/queries";
import {
  BannerView,
  HotFeaturedView,
  LoungeView,
  NewFeaturedView,
  ProjectsView,
} from "views/home";

const Home: CustomNextPage = () => {
  return (
    <>
      <BannerView />
      <Section bleed css={{ borderTop: "0px" }}>
        <Flex css={{ columnGap: "64px", rowGap: "36px", flexWrap: "wrap" }}>
          <HotFeaturedView css={{ flex: "3 1 480px" }} />
          <NewFeaturedView css={{ flex: "2 1 320px" }} />
        </Flex>
      </Section>
      <Section>
        <Flex css={{ columnGap: "64px", rowGap: "36px", flexWrap: "wrap" }}>
          <ProjectsView css={{ flex: "3 1 480px" }} />
          <LoungeView css={{ flex: "2 1 320px" }} />
        </Flex>
      </Section>
    </>
  );
};

Home.getLayout = createPageLayout({
  ignoreDefaultTopPadding: true,
});

export default Home;

/* -------------------------------------------------------------------------- */
/*                                     api                                    */
/* -------------------------------------------------------------------------- */

export const getServerSideProps: GetServerSideProps = injectSession(
  async ({ http }) => {
    const queryClient = new QueryClient();

    await Promise.all([
      queryClient.prefetchQuery("front/featured", () =>
        fetchFrontFeatured(http)
      ),
      // queryClient.prefetchQuery("front/projects", fetchFrontProjects),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
