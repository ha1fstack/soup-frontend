import Image from "next/image";
import { Flex, Box } from "common/components";
import { SectionHeader, DividingSection } from "common/components/Section";
import { Viewer } from "components";

const Page = () => {
  return (
    <div>
      <SectionHeader>
        <SectionHeader.Title>프로젝트/스터디 찾기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>

      <DividingSection
        column
        css={{
          gap: "18px",
          paddingTop: "18px",
          paddingBottom: "18px",
        }}
      >
        <p
          css={{
            fontSize: "30px",
            fontWeight: "500",
            lineHeight: "initial",
          }}
        >
          사이드 프로젝트 같이 하실 UI/UX 디자이너 분을 구합니다!
        </p>
        <Flex css={{ alignItems: "center", gap: "8px" }}>
          <span
            css={{
              height: "44px",
              width: "44px",
              borderRadius: "99999px",
              border: "1px solid #eceff1",
              overflow: "hidden",
            }}
          >
            <Image
              src="https://i.imgur.com/tvzwhsF.png"
              alt="me"
              width="48px"
              height="48px"
            />
          </span>
          <Flex column css={{ lineHeight: "initial" }}>
            <p css={{ fontWeight: "600" }}>홍길동</p>
            <p>2022.01.01. 09:00</p>
          </Flex>
        </Flex>
      </DividingSection>
      <Flex>
        <Viewer
          css={{
            maxWidth: "960px",
            marginTop: "24px",
            marginBottom: "96px",
          }}
        />
      </Flex>
      <Box column>
        <div css={{ height: "240px" }}></div>
      </Box>
    </div>
  );
};

export default Page;
