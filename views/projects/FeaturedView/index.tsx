import { Flex, Box } from "common/components";
import { http } from "common/services";
import { useQuery } from "react-query";
import { IFeaturedItem } from "types";
import FeaturedHeader from "./FeaturedHeader";
import FeaturedItem from "./FeaturedItem";

const FeaturedView = () => {
  const { data, isLoading, isError } = useQuery(
    "projects/featured",
    async () => {
      return (
        await http.get<{
          RECOMMEND: IFeaturedItem[];
          HOT: IFeaturedItem[];
        }>("/projects/featured")
      ).data;
    }
  );

  if (!data || isLoading || isError)
    return (
      <Flex
        css={{
          flex: "1 0 300px",
        }}
      />
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
          {data.RECOMMEND.map(({ title, userName, id }) => (
            <FeaturedItem key={id} title={title} userName={userName} id={id} />
          ))}
        </Flex>
      </Box>
      <Box css={{ padding: "14px 12px" }} column>
        <FeaturedHeader content="지금 HOT한 프로젝트 🔥" />
        <Flex column css={{ gap: "20px" }}>
          {data.HOT.map(({ title, userName, id }) => (
            <FeaturedItem key={id} title={title} userName={userName} id={id} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default FeaturedView;
