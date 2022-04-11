import type { NextPage } from "next";
import { Button } from "styles/components/button";
import styles from "../styles/Home.module.css";
import { DividingSection, SectionHeader } from "styles/layout";

const Sample = () => (
  <div
    css={{
      flex: "40%",
      minWidth: "480px",
      border: "1px solid #ECEFF1",
      background: "#fafbfb",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "row",
      height: "150px",
      overflow: "hidden",
    }}
  >
    <div
      css={{
        flex: "0 0 auto",
        background: "#ECEFF1",
        width: "100px",
        height: "100%",
      }}
    >
      &nbsp;
    </div>
    <div css={{ display: "flex", flexDirection: "column" }}>
      <div
        css={{
          flexWrap: "nowrap",
          boxSizing: "border-box",
          height: "100%",
          flex: "0 1 auto",
          display: "flex",
          flexDirection: "column",
          padding: "10px 10px 8px 10px",
          justifyContent: "space-between",
          overflow: "hidden",
          lineHeight: "1.2em",
        }}
      >
        <div
          css={{
            fontWeight: "bold",
            fontSize: "16px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          사이드 프로젝트 같이 하실 UI/UX 디자이너 분을 구합니다!
        </div>
        <div
          css={{
            overflow: "hidden",
            fontSize: "13px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          타입스크립트, 까다롭기만한데 굳이 왜 써야할까?에 대한 가벼운 이야기를
          다룹니다. 본 게시물은 프론트엔드와 백엔드 개발자 모두가 이해할 수 있는
          수준으로 작성되었습니다 :)
        </div>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          margin: "0px 12px",
          padding: "10px 0px",
          justifyContent: "space-between",
          borderTop: "1px solid #E0E3E7",
          alignItems: "center",
        }}
      >
        <div css={{ fontSize: "14px", fontWeight: 500 }}>인프런 | 웹 개발</div>
        <div
          css={{
            display: "flex",
            "& > *+*": {
              marginLeft: "8px",
            },
          }}
        >
          <div
            css={{
              height: "24px",
              width: "24px",
              backgroundColor: "#E0E3E7",
            }}
          />
          <div
            css={{
              height: "24px",
              width: "24px",
              backgroundColor: "#E0E3E7",
            }}
          />
          <div
            css={{
              height: "24px",
              width: "24px",
              backgroundColor: "#E0E3E7",
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

const Home: NextPage = () => {
  return (
    <div>
      <SectionHeader>
        <SectionHeader.Title>프로젝트/스터디</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <DividingSection>
        <div css={{ "& > *+*": { marginLeft: "12px" } }}>
          <Button variant="primary-outlined">+ 태그 추가</Button>
          <Button variant="white">Typescript</Button>
          <Button variant="white">Vue</Button>
          <Button variant="white">Python</Button>
        </div>
      </DividingSection>
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          margin: "-12px",
          marginTop: "24px",
          "& > *": {
            margin: "12px",
          },
        }}
      >
        <Sample /> <Sample /> <Sample /> <Sample /> <Sample /> <Sample />
        <Sample /> <Sample /> <Sample /> <Sample /> <Sample /> <Sample />
        <Sample /> <Sample /> <Sample /> <Sample /> <Sample /> <Sample />
        <Sample /> <Sample /> <Sample /> <Sample /> <Sample /> <Sample />
      </div>
    </div>
  );
};

export default Home;
