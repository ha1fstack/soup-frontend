import { Flex, Box } from "common/atoms";
import { useToggle } from "lib/hooks";
import TagFinder from "./TagFinder";
import TagSlider from "./TagSlider";

const TagSearch = () => {
  const [isSearchMode, toggleIsSearchMode] = useToggle(false);

  return (
    <Flex css={{ flexWrap: "wrap", marginTop: "-64px" }}>
      <Box
        css={{
          flex: "99999 1 480px",
          overflow: "hidden",
        }}
      >
        {isSearchMode ? (
          <TagFinder toggle={toggleIsSearchMode} />
        ) : (
          <TagSlider toggle={toggleIsSearchMode} />
        )}
      </Box>
      <div css={{ flex: "1 0 300px", height: 0, marginLeft: "24px" }}></div>
    </Flex>
  );
};

export default TagSearch;
