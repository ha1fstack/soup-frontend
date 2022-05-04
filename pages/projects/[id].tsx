import Image from "next/image";
import { Flex, Box } from "common/components";
import { SectionHeader, DividingSection } from "common/components/Section";
import { Viewer } from "components";
import { useQuery } from "react-query";
import { http } from "common/services";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/router";

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
      </DividingSection>
      <Flex
        column
        css={{
          maxWidth: "960px",
        }}
      >
        <Box
          responsive
          css={{
            padding: "24px",
            marginTop: "24px",
            marginBottom: "48px",
            lineHeight: 1.5,
          }}
        >
          {data.source === "SOUP" ? (
            <Viewer content={JSON.parse(data.content as any) as JSONContent} />
          ) : (
            data.content
          )}
        </Box>
        <Box column>
          <div css={{ height: "240px" }}></div>
        </Box>
      </Flex>
    </div>
  );
};

export default Page;
