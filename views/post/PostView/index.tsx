import { Box, Hr, Flex } from "common/atoms";
import { NotFound, Viewer } from "components";
import { projectQueryContext } from "lib/queries";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useQuery } from "react-query";
import PostHeader from "./PostHeader";
import PostPreview from "./PostPreview";

const PostView = () => {
  const { query } = useRouter();
  const { id } = query as {
    id: string;
  };

  const { data, isLoading, isError } = useQuery(...projectQueryContext({ id }));

  if (isLoading || isError) return null;
  if (!data) return <NotFound />;

  return (
    <>
      <Head>
        <title>SouP | {data.postName}</title>
        <meta property="og:description" content={data.postName} />
      </Head>
      <Box
        responsive
        column
        css={{
          flex: "99999 1 480px",
          boxSizing: "border-box",
          padding: "24px",
        }}
      >
        <PostHeader data={data} />
        <Hr css={{ marginTop: "16px" }} />
        <Flex
          css={{
            marginTop: "36px",
            marginBottom: "12px",
            lineHeight: 1.5,
            justifyContent: "center",
          }}
        >
          {data.type === "prosemirror" ? (
            <Viewer content={JSON.parse(data.content as unknown as string)} />
          ) : (
            <PostPreview data={data} />
          )}
        </Flex>
      </Box>
    </>
  );
};

export default PostView;
