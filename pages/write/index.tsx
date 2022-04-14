import { Editor } from "components/Editor";
import React from "react";
import { Box, Flex } from "styles/components/Box";
import { Button } from "styles/components/Button";
import { Input } from "styles/components/Input";
import { SectionHeader } from "styles/layout";

const Write = () => {
  return (
    <div>
      <SectionHeader>
        <SectionHeader.Title>새 모집 만들기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <Box
        column
        css={{
          "& > *+*": {
            marginTop: "12px",
          },
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
          <Button variant="primary">작성하기</Button>
        </Flex>
        <Editor />
      </Box>
    </div>
  );
};

export default Write;
