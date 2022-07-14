import { Flex, Label, Button } from "common/atoms";
import { getDisplayTag } from "lib/utils";
import { MdOutlineLabel, MdOutlineClose } from "react-icons/md";
import useFilter from "../useFilter";

const FilterView = () => {
  const { filter, removeFilter } = useFilter();

  return (
    <Flex column css={{ gap: "12px", marginBottom: "31px" }}>
      <div
        css={{
          display: "flex",
          gap: "12px",
          "& > *": { fontSize: "1.4rem" },
        }}
      >
        <Label css={{ padding: "0px 8px" }}>
          <MdOutlineLabel />
          {!filter.length && <span>태그를 3개까지 추가해 검색해보세요...</span>}
        </Label>
        {filter.map((stack, i) => (
          <Label css={{ border: 0, fontSize: "1.6rem" }} key={stack}>
            {getDisplayTag(stack)}
            <Button
              css={{
                width: "16px",
                height: "16px",
                borderRadius: "1.8rem",
                padding: 0,
                margin: "0px -4px 0px 6px",
                fontSize: "1.1rem",
                color: "var(--negative2)",
              }}
              onClick={() => removeFilter(i)}
            >
              <MdOutlineClose />
            </Button>
          </Label>
        ))}
      </div>
    </Flex>
  );
};

export default FilterView;
