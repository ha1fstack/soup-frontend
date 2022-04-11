import type { NextPage } from "next";
import { Button } from "styles/components/button";
import { DividingSection, SectionHeader } from "styles/layout";

const Sample = () => (
  <div
    css={{
      flex: "20%",
      border: "1px solid #ECEFF1",
      background: "#fafbfb",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      height: "180px",
      overflow: "hidden",
    }}
  >
    <div
      css={{
        flexWrap: "nowrap",
        boxSizing: "border-box",
        height: "100%",
        flex: "0 1 auto",
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        justifyContent: "space-between",
        overflow: "hidden",
        lineHeight: "1.2em",
      }}
    >
      <div
        css={{
          fontWeight: "500",
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
        flexDirection: "row-reverse",
        margin: "0px 12px",
        padding: "12px 0px",
        justifyContent: "space-between",
        borderTop: "1px solid #E0E3E7",
        alignItems: "center",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "row",
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
      <div>웹 개발</div>
    </div>
  </div>
);

const Home: NextPage = () => {
  return (
    <div>
      <div
        css={{
          marginTop: "36px",
          marginBottom: "48px",
        }}
      >
        <div
          css={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "18px",
          }}
        >
          인프런
        </div>
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            margin: "-12px",
            "& > *": {
              margin: "12px",
            },
          }}
        >
          <Sample /> <Sample /> <Sample /> <Sample />
        </div>
      </div>
      <div
        css={{
          marginTop: "36px",
          marginBottom: "48px",
        }}
      >
        <div
          css={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "18px",
          }}
        >
          인프런
        </div>
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            margin: "-12px",
            "& > *": {
              margin: "12px",
            },
          }}
        >
          <Sample /> <Sample /> <Sample /> <Sample />
        </div>
      </div>
      <div
        css={{
          marginTop: "36px",
          marginBottom: "48px",
        }}
      >
        <div
          css={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "18px",
          }}
        >
          인프런
        </div>
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            margin: "-12px",
            "& > *": {
              margin: "12px",
            },
          }}
        >
          <Sample /> <Sample /> <Sample /> <Sample />
        </div>
      </div>
      <div
        css={{
          marginTop: "36px",
          marginBottom: "48px",
        }}
      >
        <div
          css={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "18px",
          }}
        >
          인프런
        </div>
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            margin: "-12px",
            "& > *": {
              margin: "12px",
            },
          }}
        >
          <Sample /> <Sample /> <Sample /> <Sample />
        </div>
      </div>
      <div
        css={{
          marginTop: "36px",
          marginBottom: "48px",
        }}
      >
        <div
          css={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "18px",
          }}
        >
          인프런
        </div>
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            margin: "-12px",
            "& > *": {
              margin: "12px",
            },
          }}
        >
          <Sample /> <Sample /> <Sample /> <Sample />
        </div>
      </div>
    </div>
  );
};

export default Home;
