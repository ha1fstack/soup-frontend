import { css } from "@emotion/react";
import { Flex, ProfilePlaceholder, Label } from "common/atoms";
import { getDisplayTag } from "lib/utils";
import Link from "next/link";
import { ellipsis } from "polished";
import Skeleton from "react-loading-skeleton";
import { IPostPreviewContent } from "types";

const style = {
  postName: css({
    fontSize: "1.6rem",
    fontWeight: "600",
    ...ellipsis(),
  }),
  content: css({
    fontSize: "1.4rem",
    whiteSpace: "pre-line",
    ...ellipsis(undefined, 3),
  }),
  labelWrapper: css({
    gap: "12px",
    marginTop: "4px",
  }),
  postWrapper: css({
    gap: "16px",
    alignItems: "stretch",
    cursor: "pointer",
  }),
  contentWrapper: css({ gap: "4px", flex: "1 1 0", minWidth: 0 }),
};

export const ProjectPreviewItem = ({ post }: { post: IPostPreviewContent }) => {
  return (
    <Link passHref href={`/projects/${post.id}`}>
      <Flex as="a" css={style.postWrapper}>
        <ProfilePlaceholder size={32} value={post.userName} />
        <Flex column css={style.contentWrapper}>
          <p css={style.postName}>{post.postName}</p>
          <p css={style.content}>{post.content}</p>
          <Flex css={style.labelWrapper}>
            {post.stacks.map((stack) => (
              <Label size="smaller" key={stack}>
                {getDisplayTag(stack)}
              </Label>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export const ProjectPreviewItemSkeleton = () => (
  <Flex css={style.postWrapper}>
    <Skeleton circle width={32} height={32} />
    <Flex column css={style.contentWrapper}>
      <p css={style.postName}>
        <Skeleton />
      </p>
      <p css={style.content}>
        <Skeleton count={3} />
      </p>
      <Flex css={style.labelWrapper}>
        <Skeleton width={36} />
        <Skeleton width={36} />
        <Skeleton width={36} />
      </Flex>
    </Flex>
  </Flex>
);
