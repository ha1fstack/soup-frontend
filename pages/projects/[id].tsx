import {
  Flex,
  Box,
  Button,
  ButtonLink,
  Section,
  ProfilePlaceholder,
  Label,
  Hr,
} from "common/atoms";
import { createPageLayout, Viewer } from "components";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import { http } from "lib/services";
import { useRouter } from "next/router";
import {
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineOpenInNew,
  MdOutlineStar,
  MdOutlineStarBorder,
} from "react-icons/md";
import { CustomNextPage, IPostContentData, IPostData } from "types";
import { GetServerSideProps } from "next";
import { NotFound } from "components/NotFound";
import styled from "@emotion/styled";
import { useAuth } from "lib/hooks";
import { getDisplayColor, getDisplayTag, handleError } from "lib/utils";
import { projectQueryContext } from "lib/queries";
import { useSetAtom } from "jotai";
import { loginPopupState } from "lib/states";
import Head from "next/head";

const Page: CustomNextPage = () => {
  return (
    <>
      <Section>
        <Article />
        <Box column>
          <div css={{ height: "240px" }}></div>
        </Box>
      </Section>
    </>
  );
};

Page.getLayout = createPageLayout({
  width: 840,
  title: "프로젝트/스터디 찾기",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

export default Page;

/* -------------------------------------------------------------------------- */
/*                                 components                                 */
/* -------------------------------------------------------------------------- */

const ArticlePreview = ({
  data,
}: {
  data: {
    type: "string";
  } & IPostContentData<string>;
}) => {
  return (
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
      <ButtonLink href={data.link} target="_blank" variant="primary-outlined">
        <MdOutlineOpenInNew css={{ fontSize: "1.6rem" }} />
        원문 보기
      </ButtonLink>
    </Box>
  );
};

const ArticleHeader = ({ data }: { data: IPostContentData<unknown> }) => {
  const auth = useAuth();
  const ownership = auth.success && auth.user_id === data.userId;

  const queryClient = useQueryClient();
  const router = useRouter();
  const setLoginPopup = useSetAtom(loginPopupState);
  const { id } = router.query as {
    id: string;
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    deleteProject(id)
      .then(() => router.push("/projects"))
      .catch(() => alert("알 수 없는 오류가 발생했습니다."));
  };

  const handleEdit = async () => {
    router.push(`/projects/edit/${id}`);
  };

  const handleFav = async () => {
    if (!auth.success) {
      setLoginPopup(true);
      return;
    }

    const { data: res } = await http.post("/projects/fav", {
      id: data.id,
      mode: !data.isfav,
    });

    if (res.success)
      queryClient.setQueryData<IPostData | undefined>(
        ["project", id],
        (post) =>
          post && {
            ...post,
            isfav: res.isfav,
            fav: res.isfav ? post.fav + 1 : post.fav - 1,
          }
      );
  };

  const HeaderButton = styled(Button)`
    padding: 0;
    width: 36px;
  `;

  return (
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
                  backgroundColor: getDisplayColor(stack),
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
          fontSize: "2.8rem",
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
          fontSize: "1.4rem",
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

        <Flex
          css={{
            alignItems: "center",
            gap: "12px",
            fontSize: "1.8rem",
            color: "var(--negative2)",
          }}
        >
          {ownership ? (
            <>
              <HeaderButton onClick={handleEdit}>
                <MdOutlineEdit />
              </HeaderButton>
              <HeaderButton onClick={handleDelete}>
                <MdOutlineDelete />
              </HeaderButton>
            </>
          ) : (
            <>
              <HeaderButton
                css={{ width: "initial", padding: "0px 12px", gap: "4px" }}
                onClick={handleFav}
              >
                {data.isfav ? <MdOutlineStar /> : <MdOutlineStarBorder />}
                <span css={{ fontSize: "1.4rem" }}>{data.fav}</span>
              </HeaderButton>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

const Article = () => {
  const router = useRouter();
  const { id } = router.query as {
    id: string;
  };

  const { data, isLoading, isError } = useQuery(...projectQueryContext(id));

  if (isLoading || isError) return null;
  if (!data) return <NotFound />;

  return (
    <>
      <Head>
        <title>SouP | {data.postName}</title>
      </Head>
      <Box
        responsive
        column
        css={{
          boxSizing: "border-box",
          padding: "24px",
          marginBottom: "48px",
        }}
      >
        <ArticleHeader data={data} />
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
            <ArticlePreview data={data} />
          )}
        </Flex>
      </Box>
    </>
  );
};

const deleteProject = async (id: string) => {
  const res = await http.post<IPostData>(`/projects/delete`, { id });
  return res.data;
};

export const getServerSideProps: GetServerSideProps = handleError(
  async ({ context }) => {
    const queryClient = new QueryClient();
    const { id } = context.query as {
      id: string;
    };

    const res = await queryClient.fetchQuery(...projectQueryContext(id));

    if (!res)
      return {
        props: {
          error: 404,
        },
      };

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
