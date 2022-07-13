import { Flex } from "common/atoms";

const FeaturedHeader = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => (
  <Flex
    css={{
      alignItems: "center",
      fontSize: "1.4rem",
      fontWeight: "600",
      lineHeight: "initial",
      marginBottom: "24px",
    }}
    className={className}
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
