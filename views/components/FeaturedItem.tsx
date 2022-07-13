import { css } from "@emotion/react";
import { Flex, ProfilePlaceholder } from "common/atoms";
import Link from "next/link";
import { ellipsis } from "polished";
import Skeleton from "react-loading-skeleton";
import { IFeaturedItem } from "types";

const style = {
  bodyWrapper: css({ gap: "8px", cursor: "pointer" }),
  headerWrapper: css({
    alignItems: "center",
    fontSize: "1.3rem",
    gap: "8px",
  }),
  userName: css({ lineHeight: "initial" }),
  content: css({
    fontSize: "1.4rem",
    fontWeight: "600",
    ...ellipsis(undefined, 2),
  }),
};

export const FeaturedItem = ({ userName, content, id }: IFeaturedItem) => {
  return (
    <Link passHref href={`/projects/${id}`}>
      <Flex as="a" column css={style.bodyWrapper}>
        <Flex css={style.headerWrapper}>
          <ProfilePlaceholder size={20} value={userName} />
          <span css={style.userName}>{userName}</span>
        </Flex>
        <p css={style.content}>{content}</p>
      </Flex>
    </Link>
  );
};

export const FeaturedItemSkeleton = () => (
  <Flex column css={style.bodyWrapper}>
    <Flex css={style.headerWrapper}>
      <Skeleton circle width={20} height={20} />
      <span css={style.userName}>
        <Skeleton width={64} />
      </span>
    </Flex>
    <p css={style.content}>
      <Skeleton count={2} />
    </p>
  </Flex>
);
