import { Flex, Box, Section } from "common/components";
import { createPageLayout } from "components";
import { useAuth } from "lib/hooks";
import { fetchLounge } from "lib/queries";
import { injectSession } from "lib/utils";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { CustomNextPage } from "types";
import { LoungeEditorView, LoungeListView } from "views/lounge";

const Lounge: CustomNextPage = () => {
  const auth = useAuth();

  return (
    <>
      <Section>
        <Flex column gap="24px">
          {auth.success ? <LoungeEditorView /> : <LoungeLoginMessage />}
          <LoungeListView />
        </Flex>
      </Section>
    </>
  );
};

Lounge.getLayout = createPageLayout({
  width: 840,
  title: "라운지",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

export default Lounge;

const LoungeLoginMessage = () => (
  <Box variant="primary" css={{ lineHeight: "initial" }}>
    로그인 후 라운지에 이야기를 작성해 보세요.
  </Box>
);

export const getServerSideProps: GetServerSideProps = injectSession(
  async ({ http }) => {
    const queryClient = new QueryClient();

    await Promise.all([
      queryClient.prefetchQuery("lounge", () => fetchLounge(http)),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
