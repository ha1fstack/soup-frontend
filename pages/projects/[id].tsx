import Image from "next/image";
import {
  Flex,
  Box,
  Button,
  ButtonLink,
  SectionHeader,
  SectionBody,
  SectionBodyAlt,
  ProfilePlaceholder,
  Label,
} from "common/components";
import { ChildrenContainer, Viewer } from "components";
import { useQuery } from "react-query";
import { http } from "common/services";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/router";
import { MdOutlineOpenInNew } from "react-icons/md";

interface IProjectContentData<T> {
  id: number;
  postName: string;
  content: T;
  userName: string;
  date: string;
  link: "https://okky.kr/article/1221052";
  stacks: string[];
  views: number;
  talk: string;
  source: string;
  fav: number;
  isfav: boolean;
}

type IProjectData =
  | ({ type: "string" } & IProjectContentData<string>)
  | ({
      type: "prosemirror";
    } & IProjectContentData<JSONContent>);

const fetchProject = async (id?: string) => {
  if (!id) return;
  const res = await http.get<IProjectData>(`/projects/${id}`);
  return res.data;
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query as {
    id: string;
  };

  const { data, isLoading, isError } = useQuery(["project", id], () =>
    fetchProject(id)
  );

  if (!data || isLoading || isError) return null;
  return (
    <ChildrenContainer width={840}>
      <SectionHeader>
        <SectionHeader.Title>프로젝트/스터디 찾기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <SectionBody>
        <Box
          responsive
          column
          css={{
            padding: "24px",
            marginBottom: "48px",
          }}
        >
          <Flex column>
            {data.stacks.length ? (
              <Flex css={{ gap: "8px", marginBottom: "12px" }}>
                {data.stacks.map((stack, i) => (
                  <Label
                    key={i}
                    css={{ backgroundColor: "var(--positive1)" }}
                    variant="background"
                    size="small"
                  >
                    <div
                      css={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "3px",
                        backgroundColor: "#007acc",
                        marginRight: "6px",
                      }}
                    />
                    {stack}
                  </Label>
                ))}
              </Flex>
            ) : null}
            <p
              css={{
                fontSize: "28px",
                fontWeight: "500",
                lineHeight: "initial",
              }}
            >
              {data.postName}
            </p>
            <Flex
              css={{
                alignItems: "center",
                gap: "12px",
                marginTop: "16px",
                fontSize: "14px",
              }}
            >
              <ProfilePlaceholder value={data.userName} size={36} />
              <Flex column css={{ lineHeight: "initial" }}>
                <p css={{ fontWeight: "600" }}>{data.userName}</p>
                <p>{new Date(data.date).toLocaleString()}</p>
              </Flex>
            </Flex>
          </Flex>
          <hr
            css={{ marginTop: "16px", borderTop: "1px solid var(--outline)" }}
          />
          <Flex
            css={{
              marginTop: "36px",
              marginBottom: "12px",
              lineHeight: 1.5,
              justifyContent: "center",
            }}
          >
            {data.type === "prosemirror" ? (
              <Viewer content={JSON.parse(data.content as unknown as string)} />
            ) : (
              <Box
                column
                css={{
                  gap: "16px",
                  maxWidth: "480px",
                  padding: "16px",
                }}
              >
                <p>
                  <b>{data.source}</b>
                  에서 가져옴
                </p>
                <p>{data.content}...</p>
                <ButtonLink
                  href={data.link}
                  target="_blank"
                  variant="primary-outlined"
                >
                  <MdOutlineOpenInNew css={{ fontSize: "16px" }} />
                  원문 보기
                </ButtonLink>
              </Box>
            )}
          </Flex>
        </Box>
        <Box column>
          <div css={{ height: "240px" }}></div>
        </Box>
      </SectionBody>
    </ChildrenContainer>
  );
};

export default Page;
