import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "styles/components/Button";
import styles from "../styles/Home.module.css";
import { DividingSection, SectionHeader } from "styles/layout";
import { Label } from "styles/components/Label";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const Sample = ({ image }: { image?: boolean }) => (
  <div
    css={{
      flex: "30%",
      minWidth: "480px",
      border: "1px solid #ECEFF1",
      background: "#fafbfb",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "row",
      height: "170px",
      overflow: "hidden",
    }}
  >
    <div css={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        css={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          padding: "10px 12px 8px 12px",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            width: "100%",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            height: "100%",
            flex: "0 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            lineHeight: "1.2em",
            paddingBottom: "6px",
            borderBottom: "1px solid #E0E3E7",
          }}
        >
          <div>
            <div
              css={{
                fontWeight: "500",
                fontSize: "16px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                marginBottom: "8px",
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
              타입스크립트, 까다롭기만한데 굳이 왜 써야할까?에 대한 가벼운
              이야기를 다룹니다. 본 게시물은 프론트엔드와 백엔드 개발자 모두가
              이해할 수 있는 수준으로 작성되었습니다 :)
            </div>
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
            by <strong>홍길동</strong> · 1시간 전 · 댓글 3개
          </div>
        </div>
        {image ? (
          <div
            css={{
              boxSizing: "border-box",
              marginLeft: "16px",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
              flex: "0 0 auto",
              background: "#ECEFF1",
              width: "120px",
            }}
          >
            <Image
              css={{ objectFit: "cover" }}
              src="https://i.imgur.com/tvzwhsF.png"
              alt="thumb"
              layout="fill"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          margin: "8px",
          marginTop: 0,
          justifyContent: "space-between",
          alignItems: "center",
          lineHeight: "normal",
        }}
      >
        <div
          css={{
            fontWeight: 500,
            display: "flex",
            "& > *+*": { marginLeft: "8px" },
          }}
        >
          <Label variant="white" size="small">
            인프런
          </Label>
          <Label variant="white" size="small">
            웹 개발
          </Label>
          <Label variant="white" size="small">
            <div
              css={{
                height: "20px",
                width: "20px",
                marginLeft: "-2px",
                marginRight: "4px",
              }}
            >
              <Image src="/stacks/ts.png" alt="me" width="24px" height="24px" />
            </div>
            Typescript
          </Label>
          <Label variant="white" size="small">
            <div
              css={{
                height: "20px",
                width: "20px",
                marginLeft: "-2px",
                marginRight: "4px",
              }}
            >
              <Image
                src="/stacks/node.png"
                alt="me"
                width="24px"
                height="24px"
              />
            </div>
            node.js
          </Label>
          <Label variant="white" size="small">
            <div
              css={{
                height: "20px",
                width: "20px",
                marginLeft: "-2px",
                marginRight: "4px",
              }}
            >
              <Image
                src="/stacks/react.png"
                alt="me"
                width="24px"
                height="24px"
              />
            </div>
            React
          </Label>
        </div>
        <div
          css={{
            cursor: "pointer",
            display: "flex",
            color: "#616b77",
            alignItems: "center",
          }}
        >
          <span css={{ fontSize: "13px" }}>6</span>
          <div
            css={{
              fontSize: "17px",
              marginLeft: "4px",
              marginRight: "4px",
            }}
          >
            <MdOutlineFavoriteBorder />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Project: NextPage = () => {
  return (
    <div>
      <SectionHeader>
        <SectionHeader.Title>프로젝트/스터디 찾기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <DividingSection>
        <div css={{ display: "flex", "& > *+*": { marginLeft: "8px" } }}>
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
        <Sample /> <Sample image /> <Sample /> <Sample /> <Sample image />
        <Sample /> <Sample image /> <Sample /> <Sample /> <Sample />
        <Sample image /> <Sample /> <Sample /> <Sample /> <Sample /> <Sample />
        <Sample image /> <Sample /> <Sample /> <Sample image /> <Sample />
        <Sample /> <Sample /> <Sample />
      </div>
    </div>
  );
};

export default Project;
