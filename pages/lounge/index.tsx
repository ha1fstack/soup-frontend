import { Flex, Box, Section } from "common/atoms";
import { createPageLayout } from "components";
import { useAuth } from "lib/hooks";
import { loungeQueryContext } from "lib/queries";
import { handleError } from "lib/utils";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { dehydrate, QueryClient } from "react-query";
import { CustomNextPage } from "types";
import { LoungeEditorView, LoungeListView } from "views/lounge";

const Lounge: CustomNextPage = () => {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>SouP | 라운지</title>
      </Head>
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
  // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

export default Lounge;

const LoungeLoginMessage = () => (
  <Box variant="primary" css={{ lineHeight: "initial" }}>
    로그인 후 라운지에 이야기를 작성해 보세요.
  </Box>
);

export const getServerSideProps: GetServerSideProps = handleError(async () => {
  const queryClient = new QueryClient();

  await Promise.all([queryClient.prefetchQuery(...loungeQueryContext())]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
