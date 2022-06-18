import { NextPage } from "next";
import { SectionBody } from "common/components";
import { ChildrenContainer } from "components";
import Link from "next/link";

const Error404: NextPage = () => {
  return (
    <ChildrenContainer>
      <SectionBody>
        <div
          css={{
            marginTop: "24px",
            color: "var(--negative)",
          }}
        >
          <div
            css={{
              lineHeight: 1,
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            <h1
              css={{
                fontSize: "60px",
                color: "var(--positive)",
                backgroundColor: "var(--primary)",
                padding: "8px 12px",
                borderRadius: "8px",
              }}
            >
              404
            </h1>
          </div>
          <p>존재하지 않는 페이지에요 T-T</p>
          <Link href="/">
            <a>{"메인으로 돌아가기 >>"}</a>
          </Link>
        </div>
      </SectionBody>
    </ChildrenContainer>
  );
};

export default Error404;
