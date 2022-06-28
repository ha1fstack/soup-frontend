import { Flex } from "common/components";
import { timeDiffString } from "lib/utils";
import Image from "next/image";
import { ellipsis } from "polished";
import { ILoungePost } from "types";

const LoungeItem = ({ post }: { post: ILoungePost }) => {
  return (
    <Flex css={{ gap: "12px", alignItems: "stretch" }}>
      <Flex
        column
        css={{
          gap: "16px",
          alignItems: "center",
          flex: "0 0 auto",
        }}
      >
        <Image
          css={{
            width: "32px",
            height: "32px",
            borderRadius: "99999px",
            overflow: "hidden",
          }}
          width="32px"
          height="32px"
          alt="profile"
          src={post.picture}
        />
      </Flex>
      <Flex column css={{ gap: "4px", flex: "1 1 auto" }}>
        <Flex css={{ justifyContent: "space-between", alignItems: "center" }}>
          <p css={{ fontSize: "1.4rem" }}>
            <b>{post.username}</b> · {timeDiffString(post.date)}
          </p>
        </Flex>
        <div
          css={{
            fontSize: "1.4rem",
            whiteSpace: "pre-line",
            ...ellipsis(undefined, 3),
          }}
        >
          {post.content}
        </div>
      </Flex>
    </Flex>
  );
};

export default LoungeItem;
