import { Flex } from "common/components";
import Link from "next/link";
import { ellipsis } from "polished";
import { IPostPreviewContent } from "types";
import Image from "next/image";

const NewItem = ({ post }: { post: IPostPreviewContent }) => {
  return (
    <Link passHref href={`/projects/${post.id}`}>
      <Flex as="a" css={{ gap: "16px", cursor: "pointer" }}>
        <span css={{ flex: "0 0 auto", height: "75px" }}>
          <Image
            alt="hot1"
            src="https://i.imgur.com/oEdONmz.jpeg"
            width={100}
            height={75}
          />
        </span>
        <Flex
          column
          css={{ flex: "1", width: 0, gap: "4px", overflow: "hidden" }}
        >
          <p
            css={{
              fontSize: "1.6rem",
              fontWeight: "600",
              ...ellipsis(),
            }}
          >
            {post.postName}
          </p>
          <p
            css={{
              fontSize: "1.3rem",
              ...ellipsis(undefined, 2),
            }}
          >
            {post.content}
          </p>
        </Flex>
      </Flex>
    </Link>
  );
};

export default NewItem;
