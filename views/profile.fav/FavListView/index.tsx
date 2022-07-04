import { Box, Flex } from "common/components";
import { http } from "common/services";
import produce from "immer";
import { useQuery, useQueryClient } from "react-query";
import { IPostPreviewContent } from "types";
import { ProjectItem } from "views/components";

const FavListView = () => {
  const { data, isLoading, isError } = useQuery<IPostPreviewContent[]>(
    "favoritePosts",
    async () => {
      return (await http.get<any>("/myfav")).data;
    }
  );

  const queryClient = useQueryClient();

  const handleFav = async (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    post: IPostPreviewContent
  ) => {
    e.preventDefault();

    const { data: res } = await http.post("/projects/fav", {
      id: post.id,
      mode: !post.isfav,
    });

    if (res.success)
      queryClient.setQueryData<IPostPreviewContent[] | undefined>(
        "favoritePosts",
        (projects) =>
          projects &&
          produce(projects, (draft) => {
            const _post = draft.find((_post) => _post.id === post.id);
            if (_post) _post.isfav = !post.isfav;
          })
      );
  };

  if (!data || isLoading || isError) return null;

  return (
    <div>
      <Box.Header>스크랩</Box.Header>
      <Flex column css={{ gap: "12px" }}>
        {data.map((post, i) => (
          <ProjectItem handleFav={handleFav} post={post} key={post.id} />
        ))}
      </Flex>
    </div>
  );
};

export default FavListView;
