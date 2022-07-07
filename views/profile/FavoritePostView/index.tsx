import { Box, Button, Flex, Hr } from "common/atoms";
import { http } from "lib/services";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { IPostPreviewContent } from "types";
import {
  ProjectPreviewItem,
  ProjectPreviewItemSkeleton,
} from "views/components";

const FavoritePostView = () => {
  const { data, isLoading, isError } = useQuery<IPostPreviewContent[]>(
    "favoritePosts",
    async () => {
      return (await http.get<any>("/myfav")).data;
    }
  );

  const router = useRouter();

  const content = (() => {
    if (data) {
      if (data.length === 0) return <NothingHere />;
      return (
        <Box responsive column css={{ gap: "12px" }}>
          <>
            {data.slice(0, 5).map((post, i) => (
              <Fragment key={post.id}>
                {i !== 0 && <Hr />}
                <ProjectPreviewItem post={post} />
              </Fragment>
            ))}
            <Button onClick={() => router.push("/profile/fav")}>
              모두 보기...
            </Button>
          </>
        </Box>
      );
    }
    return (
      <Box responsive column css={{ gap: "24px" }}>
        <ProjectPreviewItemSkeleton />
        <ProjectPreviewItemSkeleton />
        <ProjectPreviewItemSkeleton />
      </Box>
    );
  })();

  return (
    <div css={{ width: "100%" }}>
      <Box.Header>내 스크랩</Box.Header>
      {content}
    </div>
  );
};

export default FavoritePostView;

const NothingHere = () => (
  <Box responsive column css={{ alignItems: "center", padding: "16px" }}>
    <p css={{ fontSize: "2.2rem", fontWeight: 500 }}>
      😢 보여드릴 내용이 없어요
    </p>
    <p css={{ fontSize: "1.4rem" }}>관심가는 게시글을 모아보세요</p>
  </Box>
);
