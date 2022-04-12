import { Box, Flex } from "styles/components/box";
import { SectionHeader } from "styles/layout";
import Image from "next/image";

const DetailsRow = ({
  item,
  value,
  index,
}: {
  item: string;
  value: string;
  index: number;
}) => (
  <>
    <p css={{ gridRow: index, gridColumn: 1, fontWeight: 600 }}>{item}</p>
    <p css={{ gridRow: index, gridColumn: 2 }}>{value}</p>
  </>
);

const Profile = () => {
  return (
    <div>
      <SectionHeader>
        <SectionHeader.Title>내 프로필</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <Flex
        css={{
          justifyContent: "space-between",
          width: "100%",
          alignItems: "flex-start",
          "& > *": {
            flex: 1,
          },
          "& > *+*": {
            marginLeft: "12px",
          },
        }}
      >
        <Flex
          column
          css={{
            "& > *+*": {
              marginTop: "12px",
            },
          }}
        >
          <Box column>
            <Flex
              css={{
                alignItems: "center",
                padding: "6px",
                marginBottom: "12px",
              }}
            >
              <div
                css={{
                  overflow: "hidden",
                  borderRadius: "9999px",
                  height: "72px",
                  width: "72px",
                }}
              >
                <Image
                  src="https://i.imgur.com/tvzwhsF.png"
                  alt="me"
                  width="96px"
                  height="96px"
                />
              </div>
              <div css={{ marginLeft: "16px" }}>
                <p css={{ fontSize: "18px", fontWeight: 700 }}>홍길동</p>
                <p css={{ fontSize: "14px", fontWeight: 500 }}>
                  gildong@example.com
                </p>
              </div>
            </Flex>
            <hr css={{ color: "#dfe2e6" }} />
            <Flex column css={{ marginTop: "18px", marginBottom: "6px" }}>
              <Flex
                css={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  columnGap: "32px",
                  rowGap: "4px",
                }}
              >
                {[
                  ["닉네임", "홍길동"],
                  ["소셜 로그인", "Github"],
                  ["이메일", "gildong@example.com"],
                ].map((item, index) => (
                  <DetailsRow
                    item={item[0]}
                    value={item[1]}
                    index={index + 1}
                    key={String(index)}
                  />
                ))}
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Flex
          column
          css={{
            "& > *+*": {
              marginTop: "12px",
            },
          }}
        >
          <Box column>
            <p css={{ fontWeight: 600 }}>선호 스택</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Box>
          <Box column>
            <p css={{ fontWeight: 600 }}>스킬</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default Profile;
