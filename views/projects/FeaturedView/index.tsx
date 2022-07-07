import { Box, Flex } from "common/atoms";
import { projectsFeaturedQueryContext } from "lib/queries/projectsFeatured";
import { useQuery } from "react-query";
import FeaturedHeader from "./FeaturedHeader";
import { FeaturedItem, FeaturedItemSkeleton } from "./FeaturedItem";

const FeaturedView = () => {
  const { data, isLoading, isError } = useQuery(
    ...projectsFeaturedQueryContext(),
    {
      staleTime: 5000,
    }
  );

  return (
    <Flex
      css={{
        marginTop: "56px",
        flex: "1 0 300px",
        gap: "12px",
        alignSelf: "flex-start",
        position: "sticky",
        top: "71px",
      }}
      column
    >
      <Box css={{ padding: "14px 12px" }} column>
        <FeaturedHeader content="이런 프로젝트는 어떠신가요?" />
        <Flex column css={{ gap: "20px" }}>
          {data ? (
            data.RECOMMEND.map(({ title, userName, id }) => (
              <FeaturedItem
                key={id}
                title={title}
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
      <Box css={{ padding: "14px 12px" }} column>
        <FeaturedHeader content="지금 HOT한 프로젝트 🔥" />
        <Flex column css={{ gap: "20px" }}>
          {data ? (
            data.HOT.map(({ title, userName, id }) => (
              <FeaturedItem
                key={id}
                title={title}
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

export default FeaturedView;
