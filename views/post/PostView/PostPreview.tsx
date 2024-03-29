import { Box, Flex, ButtonLink } from "common/atoms";
import { SourceDictionary } from "lib/utils";
import { MdOutlineOpenInNew } from "react-icons/md";
import { IPostContentData } from "types";

const PostPreview = ({
  data,
}: {
  data: {
    type: "string";
  } & IPostContentData<string>;
}) => {
  return (
    <Box
      column
      css={{
        gap: "16px",
        width: "auto",
        maxWidth: "480px",
        padding: "16px",
      }}
    >
      <Flex css={{ alignItems: "center" }}>
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
        <b>{SourceDictionary[data.source]}</b>
        에서 가져옴
      </Flex>
      <p>{data.content}...</p>
      <ButtonLink
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary-outlined"
      >
        <MdOutlineOpenInNew />
        <span>원문 보기</span>
      </ButtonLink>
    </Box>
  );
};

export default PostPreview;
