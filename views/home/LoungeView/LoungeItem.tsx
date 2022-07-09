import { Flex, ProfilePlaceholder } from "common/atoms";
import { timeDiffString } from "lib/utils";
import Image from "next/image";
import { ellipsis } from "polished";
import { ILoungePost } from "types";

const LoungeItem = ({ post }: { post: ILoungePost }) => {
  return (
    <Flex css={{ gap: "12px" }}>
      <Flex
        column
        css={{
          gap: "16px",
          alignItems: "center",
          flex: "0 0 auto",
        }}
      >
        <ProfilePlaceholder value={post.userName} size={32} />
      </Flex>
      <Flex column css={{ gap: "4px", flex: "1 1 auto" }}>
        <Flex css={{ justifyContent: "space-between", alignItems: "center" }}>
          <p css={{ fontSize: "1.4rem" }}>
            <b>{post.userName}</b> · {timeDiffString(post.date)}
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
