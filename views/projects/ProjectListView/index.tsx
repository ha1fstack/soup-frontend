import { Box, Flex } from "common/atoms";
import { http } from "lib/services";
import produce from "immer";
import { useSetAtom } from "jotai";
import { useAuth } from "lib/hooks";
import { projectsQueryContext, projectsQueryKey } from "lib/queries";
import { loginPopupState } from "lib/states";
import { ITag } from "lib/utils";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { IPageable, IPostPreviewContent } from "types";
import { ProjectItem } from "views/components";
import ProjectPagination from "./ProjectPagination";

const ProjectListView = () => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;

  const auth = useAuth();
  const setLoginPopup = useSetAtom(loginPopupState);
  const queryClient = useQueryClient();

  const stacks = router.query.stacks
    ? ((Array.isArray(router.query.stacks)
        ? router.query.stacks
        : router.query.stacks.split(",")) as ITag[])
    : undefined;

  const { data, isLoading, isError } = useQuery(
    ...projectsQueryContext(currentPage, stacks)
  );

  if (!data || isLoading || isError) return null;

  const CurrentProjectPagination = () => (
    <ProjectPagination current={currentPage} end={data?.totalPages || 0} />
  );

  const handleFav = async (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    post: IPostPreviewContent
  ) => {
    e.preventDefault();

    if (!auth.success) {
      setLoginPopup(true);
      return;
    }

    const { data: res } = await http.post("/projects/fav", {
      id: post.id,
      mode: !post.isfav,
    });

    if (res.success)
      queryClient.setQueryData<IPageable<IPostPreviewContent[]> | undefined>(
        projectsQueryKey(currentPage, stacks),
        (projects) =>
          projects &&
          produce(projects, (draft) => {
            const _post = draft.content.find((_post) => _post.id === post.id);
            if (_post) _post.isfav = !post.isfav;
          })
      );
  };

  return (
    <Flex
      column
      css={{
        flex: "99999 1 480px",
        marginBottom: "-56px",
        gap: "16px",
        padding: "16px 0px",
      }}
    >
      {data.content.length === 0 ? (
        <NothingHere />
      ) : (
        <>
          <CurrentProjectPagination />
          <Flex
            column
            css={{
              gap: "12px",
            }}
          >
            {data.content.map((post, i) => (
              <ProjectItem handleFav={handleFav} post={post} key={i} />
            ))}
          </Flex>
          <CurrentProjectPagination />
        </>
      )}
    </Flex>
  );
};

export default ProjectListView;

const NothingHere = () => (
  <Box responsive column css={{ alignItems: "center", padding: "16px" }}>
    <p css={{ fontSize: "2.2rem", fontWeight: 500 }}>
      😢 보여드릴 내용이 없어요
    </p>
    <p css={{ fontSize: "1.4rem" }}>다른 검색 조건을 사용해 보세요</p>
  </Box>
);
