import { Flex } from "common/atoms";
import { frontFeaturedQueryContext } from "lib/queries";
import { useQuery } from "react-query";
import NewItem from "./NewItem";

const NewFeatured = ({ className }: { className?: string }) => {
  const { data, isLoading, isError } = useQuery(...frontFeaturedQueryContext());

  if (!data || isLoading || isError) return null;

  return (
    <Flex
      column
      className={className}
      css={{
        gap: "24px",
        img: {
          borderRadius: "6px",
        },
        maxWidth: "676px",
      }}
    >
      <p
        css={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        New 스터디/프로젝트 ✨
      </p>
      <Flex column css={{ gap: "24px" }}>
        {data.NEW.slice(0, 3).map((post, i) => (
          <NewItem index={i + 9} key={post.id} post={post} />
        ))}
      </Flex>
    </Flex>
  );
};

export default NewFeatured;
