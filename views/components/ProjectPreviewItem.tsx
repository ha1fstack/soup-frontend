import { Flex, ProfilePlaceholder, Label } from "common/components";
import { getDisplayTag } from "lib/utils";
import Link from "next/link";
import { ellipsis } from "polished";
import { IPostPreviewContent } from "types";

const ProjectPreviewItem = ({ post }: { post: IPostPreviewContent }) => {
  return (
    <Link passHref href={`/projects/${post.id}`}>
      <Flex
        as="a"
        css={{
          gap: "16px",
          alignItems: "stretch",
          cursor: "pointer",
        }}
      >
        <Flex
          column
          css={{
            gap: "16px",
            alignItems: "center",
            flex: "0 0 auto",
          }}
        >
          <ProfilePlaceholder size={32} value={post.userName} />
        </Flex>
        <Flex column css={{ gap: "4px", flex: "1 1 0", minWidth: 0 }}>
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
              fontSize: "1.4rem",
              whiteSpace: "pre-line",
              ...ellipsis(undefined, 3),
            }}
          >
            {post.content}
          </p>
          <Flex css={{ gap: "12px", marginTop: "4px" }}>
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

export default ProjectPreviewItem;
