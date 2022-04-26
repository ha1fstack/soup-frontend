import { Flex, Box, TextArea, Button } from "common/components";
import { SectionHeader } from "common/components/Section";
import Image from "next/image";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import ReactTextareaAutosize from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";

const Post = () => {
  return (
    <Flex css={{ gap: "18px", alignItems: "stretch" }}>
      <Flex
        column
        css={{
          gap: "16px",
          alignItems: "center",
          width: "48px",
          flex: "1 0 auto",
        }}
      >
        <Image
          css={{
            width: "48px",
            height: "48px",
            borderRadius: "99999px",
            overflow: "hidden",
          }}
          width="48px"
          height="48px"
          alt="profile"
          src="https://i.imgur.com/tvzwhsF.png"
        />
        <Flex
          css={{
            flexDirection: "column",
            alignItems: "center",
            color: "#757e88",
          }}
        >
          <MdOutlineFavoriteBorder style={{ fontSize: "17px", margin: 0 }} />
          <span css={{ fontSize: "13px" }}>123</span>
        </Flex>
      </Flex>
      <Flex column css={{ gap: "6px" }}>
        <p>
          by <b>Gildong Hong</b> · 17분 전
        </p>
        <div>
          Apple의 system-ui가 익숙한 나로서는 San Francisco와 Apple SD 산돌고딕
          Neo가 없는 다른 환경에서 이를 대체할 수 있는 글꼴을 꾸준히 갈망해왔다.
          Inter는 San Francisco가 없는 다른 환경에서 대체 역할을 쏠쏠히 해오고
          있다고는 하지만, 타협 없이 네오 그로테스크의 뜻을 가진 San Francisco와
          달리 몇몇 소문자 글자가 휴머니스트적인 인상을 가지고 있기 때문에, 이를
          다듬어 아예 완벽한 따라쟁이를 만들어버리는 것은 어떨까 싶은 것이다.
          이어서 맑은 고딕과 나눔고딕을 대신해 본문용 무료 글꼴의 대명사로
          쓰이고 있는 Noto Sans KR—본고딕은, 그 글자를 조형하는 여러 사람들이
          공통적으로 자간을 조정하는 데 시간을 쏟고 있다는 것과, 본고딕의 한글
          크기가 대부분의 한글 글꼴들과 비슷하게 다국어 타이포그래피 환경에서는
          조금 크게 자리잡아 라틴 글자와 섞어쓸 때 글자 비율을 어느정도 조정해서
          쓰는 점이 제품을 만드는 데 어느정도 부채가 쌓이는 상황이라 보았고,
          이처럼 적합하지 않은 글꼴로부터 생기는 추가적인 소요를 줄이자는 데에서
          이 프로젝트를 2020년 11월부터 천천히 다듬어왔다.
        </div>
      </Flex>
    </Flex>
  );
};

const Lounge = () => {
  return (
    <div>
      <SectionHeader>
        <SectionHeader.Title>라운지</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <Flex
        css={{
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "flex-start",
          "& > *": {
            flex: 1,
          },
          gap: "24px",
        }}
      >
        <Flex
          column
          css={{
            flex: "1 0 400px",
            gap: "24px",
            maxWidth: "960px",
          }}
        >
          <Box responsive column css={{ padding: "16px" }}>
            <Flex column css={{ gap: "0px" }}>
              <Flex css={{ gap: "18px" }}>
                <div
                  css={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "99999px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    width="48px"
                    height="48px"
                    alt="profile"
                    src="https://i.imgur.com/tvzwhsF.png"
                  />
                </div>
                <ReactTextareaAutosize
                  placeholder="간단한 이야기를 작성해 보세요..."
                  css={{
                    fontSize: "18px",
                    marginTop: "10px",
                    flex: "1 0 auto",
                    resize: "none",
                    ":focus": {
                      outline: "0px",
                    },
                  }}
                  minRows={3}
                  spellCheck="false"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </Flex>
              <Flex css={{ justifyContent: "flex-end" }}>
                <Button variant="primary">작성하기</Button>
              </Flex>
            </Flex>
          </Box>

          <Box responsive column css={{ gap: "16px", padding: "16px" }}>
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
            <hr css={{ color: "#dadce0" }} />
            <Post />
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default Lounge;
