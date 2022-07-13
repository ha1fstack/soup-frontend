import { Box, Flex } from "common/atoms";
import { projectSuggestedQueryContext } from "lib/queries";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  FeaturedHeader,
  FeaturedItem,
  FeaturedItemSkeleton,
} from "views/components";

const SuggestedView = () => {
  const { query } = useRouter();
  const { id } = query as {
    id: string;
  };

  const { data } = useQuery(...projectSuggestedQueryContext({ id }), {
    staleTime: 5000,
  });

  return (
    <Flex
      css={{
        flex: "1 0 300px",
        gap: "12px",
        alignSelf: "flex-start",
        position: "sticky",
        top: "71px",
      }}
      column
    >
      <Box css={{ padding: "14px 12px" }} column>
        <FeaturedHeader content="관련된 프로젝트를 모아봤어요!" />
        <Flex column css={{ gap: "20px" }}>
          {data ? (
            data.map(({ postName, userName, id }) => (
              <FeaturedItem
                key={id}
                content={postName}
                userName={userName}
                id={id}
              />
            ))
          ) : (
            <>
              <FeaturedItemSkeleton />
              <FeaturedItemSkeleton />
              <FeaturedItemSkeleton />
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default SuggestedView;
