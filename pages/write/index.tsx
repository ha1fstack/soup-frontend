import { Box, Flex, Input, Button } from "common/components";
import { SectionHeader } from "common/components/Section";
import { Editor } from "components";

const Write = () => {
  return (
    <div
      css={{
        maxWidth: "960px",
      }}
    >
      <SectionHeader>
        <SectionHeader.Title>새 모집 만들기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <Box
        responsive
        column
        css={{
          "& > *+*": {
            marginTop: "12px",
          },
          marginBottom: "24px",
        }}
      >
        <Flex
          css={{
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <Input
            css={{ maxWidth: "480px", flex: "1 0 auto" }}
            placeholder="제목"
          />
          <Button variant="primary">작성</Button>
        </Flex>
      </Box>
      <Editor />
    </div>
  );
};

export default Write;
