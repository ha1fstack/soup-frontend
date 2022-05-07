import Image from "next/image";
import {
  Flex,
  Box,
  Button,
  ButtonLink,
  SectionHeader,
  SectionBody,
  SectionBodyAlt,
} from "common/components";
import { ChildrenContainer, Viewer } from "components";
import { useQuery } from "react-query";
import { http } from "common/services";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/router";
import { MdOutlineOpenInNew } from "react-icons/md";

const fetchProject = async (id?: string) => {
  if (!id) return;
  const res = await http.get<
    (
      | { type: "string"; content: string }
      | {
          type: "prosemirror";
          content: JSONContent;
        }
    ) & {
      title: string;
      source: string;
      stacks: string[];
      url: string;
    }
  >(`/projects/${id}`);
  return res.data;
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useQuery(["project", id], () =>
    fetchProject(id as string)
  );

  if (!data || isLoading || isError) return null;
  return (
    <ChildrenContainer width={960}>
      <SectionHeader>
        <SectionHeader.Title>프로젝트/스터디 찾기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <SectionBodyAlt
        column
        css={{
          paddingTop: "18px",
          paddingBottom: "24px",
          marginBottom: "48px",
        }}
      >
        <p
          css={{
            fontSize: "30px",
            fontWeight: "500",
            lineHeight: "initial",
          }}
        >
          {data.title}
        </p>
        <Flex css={{ alignItems: "center", gap: "8px" }}>
          <span
            css={{
              height: "44px",
              width: "44px",
              borderRadius: "99999px",
              border: "1px solid var(--outline)",
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
        <Flex column>
          <Box
            responsive
            css={{
              padding: "24px",
              marginTop: "24px",
              lineHeight: 1.5,
            }}
          >
            {data.type === "prosemirror" ? (
              <Viewer content={data.content} />
            ) : (
              <Flex column css={{ gap: "32px" }}>
                <div>{data.content}</div>
                <ButtonLink
                  href={data.url}
                  target="_blank"
                  variant="primary-outlined"
                >
                  <MdOutlineOpenInNew css={{ fontSize: "16px" }} />
                  원문 보기
                </ButtonLink>
              </Flex>
            )}
          </Box>
        </Flex>
      </SectionBodyAlt>
      <SectionBody>
        <Box column>
          <div css={{ height: "240px" }}></div>
        </Box>
      </SectionBody>
    </ChildrenContainer>
  );
};

export default Page;
