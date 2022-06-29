import { Flex } from "common/components";

const FeaturedHeader = ({ content }: { content: string }) => (
  <Flex
    css={{
      alignItems: "center",
      fontSize: "1.4rem",
      fontWeight: "600",
      lineHeight: "initial",
      marginBottom: "24px",
    }}
  >
    <span
      css={{
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "6px",
        backgroundColor: "var(--primary)",
        marginRight: "8px",
      }}
    />
    {content}
  </Flex>
);

export default FeaturedHeader;
