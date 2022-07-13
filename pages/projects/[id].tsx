import { Flex, Box, Section } from "common/atoms";
import { createPageLayout } from "components";
import { dehydrate, QueryClient } from "react-query";
import { CustomNextPage } from "types";
import { GetServerSideProps } from "next";
import { handleError } from "lib/utils";
import { projectQueryContext } from "lib/queries";
import { SuggestedView, PostView } from "views/post";

const Page: CustomNextPage = () => {
  return (
    <>
      <Section>
        <Flex css={{ gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
          <PostView />
          <SuggestedView />
        </Flex>
      </Section>
    </>
  );
};

Page.getLayout = createPageLayout({
  title: "프로젝트/스터디 찾기",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

export default Page;

export const getServerSideProps: GetServerSideProps = handleError(
  async ({ context, session }) => {
    const queryClient = new QueryClient();
    const { id } = context.query as {
      id: string;
    };

    const res = await queryClient.fetchQuery(
      ...projectQueryContext({ id }, session)
    );

    if (!res)
      return {
        props: {
          error: 404,
        },
      };

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
