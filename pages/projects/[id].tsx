import Image from "next/image";
import {
  Flex,
  Box,
  Button,
  ButtonLink,
  SectionHeader,
  SectionBody,
  ProfilePlaceholder,
  Label,
  Hr,
} from "common/components";
import { ChildrenContainer, Viewer } from "components";
import { useQuery } from "react-query";
import { http } from "common/services";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/router";
import {
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineOpenInNew,
} from "react-icons/md";
import useAuth from "hooks/useAuth";
import { IProjectData } from "types";
import { getDisplayTag, TagDictionary } from "utils/tagDictionary";

const fetchProject = async (id: string) => {
  const res = await http.get<IProjectData>(`/projects/${id}`);
  return res.data;
};

const deleteProject = async (id: string) => {
  const res = await http.post<IProjectData>(`/projects/delete`, { id });
  return res.data;
};

const Page = () => {
  const router = useRouter();

  const auth = useAuth();

  const { id } = router.query as {
    id: string;
  };

  const { data, isLoading, isError } = useQuery(["project", id], () =>
    fetchProject(id)
  );

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    deleteProject(id)
      .then(() => router.push("/projects"))
      .catch(() => alert("알 수 없는 오류가 발생했습니다."));
  };

  const handleEdit = async () => {
    router.push(`/projects/edit/${id}`);
  };

  if (!data || isLoading || isError) return null;
  const ownership = auth.user_id === data.userId;

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
                    {getDisplayTag(stack)}
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
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                marginTop: "16px",
                fontSize: "14px",
              }}
            >
              <Flex
                css={{
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <ProfilePlaceholder value={data.userName} size={36} />
                <Flex column css={{ lineHeight: "initial" }}>
                  <p css={{ fontWeight: "600" }}>{data.userName}</p>
                  <p>{new Date(data.date).toLocaleString()}</p>
                </Flex>
              </Flex>
              {ownership && (
                <Flex
                  css={{
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "18px",
                    color: "var(--negative2)",
                  }}
                >
                  <Button
                    onClick={handleEdit}
                    css={{
                      padding: 0,
                      width: "36px",
                    }}
                  >
                    <MdOutlineEdit />
                  </Button>
                  <Button
                    onClick={handleDelete}
                    css={{
                      padding: 0,
                      width: "36px",
                    }}
                  >
                    <MdOutlineDelete />
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Hr css={{ marginTop: "16px" }} />
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
                  width: "480px",
                  padding: "16px",
                }}
              >
                <Flex css={{ alignItems: "center" }}>
                  <span
                    css={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "6px",
                      backgroundColor: "var(--primary)",
                      marginRight: "8px",
                    }}
                  />
                  <b>{data.source}</b>
                  에서 가져옴
                </Flex>
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
