import { Box, Button, Flex } from "common/atoms";
import { projectSuggestedQueryContext } from "lib/queries";
import { useRouter } from "next/router";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useQuery } from "react-query";
import {
  FeaturedHeader,
  FeaturedItem,
  FeaturedItemSkeleton,
} from "views/components";
import ApplyFormMaker from "./ApplyFormMaker";

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
        flex: "1 1 300px",
        gap: "12px",
        alignSelf: "flex-start",
        position: "sticky",
        top: "71px",
      }}
      column
    >
      <Box css={{ padding: "14px 12px" }} column>
        <FeaturedHeader
          content="신청 양식 복사하기"
          css={{ marginBottom: "12px" }}
        />
        <ApplyFormMaker id={id} />
      </Box>
      <Box css={{ padding: "14px 12px" }} column>
        <FeaturedHeader content="관련된 프로젝트를 모아봤어요!" />
        <Flex column css={{ gap: "20px" }}>
          {data ? (
            data.map(({ title, userName, id }) => (
              <FeaturedItem
                key={id}
                content={title}
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
