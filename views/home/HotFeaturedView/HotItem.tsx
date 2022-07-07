import { css } from "@emotion/react";
import { Flex } from "common/atoms";
import Link from "next/link";
import { ellipsis } from "polished";
import { IPostPreviewContent } from "types";
import Image from "next/image";

const HotItem = ({ post }: { post: IPostPreviewContent }) => {
  const styles = {
    Wrapper: css`
      gap: 16px;
      flex: 1 1 320px;
      overflow: hidden;
      cursor: pointer;
    `,
    PostName: css`
      font-size: 1.6rem;
      font-weight: 600;
      ${ellipsis(undefined, 2)}
    `,
    PostContent: css`
      font-size: 1.3rem;
      ${ellipsis(undefined, 2)}
    `,
  };

  return (
    <Link passHref href={`/projects/${post.id}`}>
      <Flex as="a" column css={styles.Wrapper}>
        <Image
          alt="hot1"
          src="https://i.imgur.com/hVe2ScX.png"
          width={320}
          height={180}
        />
        <Flex column css={{ gap: "8px" }}>
          <p css={styles.PostName}>{post.postName}</p>
          <p css={styles.PostContent}>{post.content}</p>
        </Flex>
      </Flex>
    </Link>
  );
};

export default HotItem;
