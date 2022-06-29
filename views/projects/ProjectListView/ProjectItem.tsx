import { Box, Flex, ProfilePlaceholder, Label } from "common/components";
import {
  timeDiffString,
  SourceDictionary,
  getDisplayColor,
  getDisplayTag,
} from "lib/utils";
import Link from "next/link";
import { useMemo } from "react";
import { IPost } from "types";
import Image from "next/image";

const ProjectItem = ({ image, post }: { image?: boolean; post: IPost }) => {
  const timeString = useMemo(() => timeDiffString(post.date), [post]);

  return (
    <Box responsive column>
      <div
        css={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            width: "100%",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            lineHeight: "1.2em",
          }}
        >
          <Link href={`/projects/${post.id}`}>
            <a>
              <Flex
                css={{
                  alignItems: "center",
                  fontSize: "1.4rem",
                  marginBottom: "16px",
                  gap: "8px",
                }}
              >
                <ProfilePlaceholder value={post.userName} size={24} />
                <span>
                  {post.userName} · {timeString} · 조회 {post.views} · 스크랩{" "}
                  {post.fav}
                </span>
              </Flex>
              <div
                css={{
                  fontWeight: "700",
                  fontSize: "1.8rem",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  marginBottom: "12px",
                }}
              >
                {post.postName}
              </div>
              <div
                css={{
                  overflow: "hidden",
                  fontSize: "1.6rem",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  marginBottom: "16px",
                }}
              >
                {post.content}
              </div>
            </a>
          </Link>
        </div>
        {image ? (
          <div
            css={{
              boxSizing: "border-box",
              marginLeft: "16px",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
              flex: "0 0 auto",
              background: "var(--outline)",
              width: "120px",
            }}
          >
            <Image
              css={{ objectFit: "cover" }}
              src="https://i.imgur.com/tvzwhsF.png"
              alt="thumb"
              layout="fill"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          marginTop: 0,
          justifyContent: "space-between",
          alignItems: "center",
          lineHeight: "normal",
        }}
      >
        <div
          css={{
            fontWeight: 500,
            display: "flex",
            "& > *+*": { marginLeft: "8px" },
          }}
        >
          <Label
            css={{
              backgroundColor: "var(--positive1)",
            }}
            variant="background"
            size="small"
          >
            {SourceDictionary[post.source]}
          </Label>
          {post.stacks.map((stack) => (
            <Label
              key={stack}
              css={{ backgroundColor: "var(--positive1)" }}
              variant="background"
              size="small"
            >
              <div
                css={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: getDisplayColor(stack),
                  marginRight: "6px",
                }}
              />
              {getDisplayTag(stack)}
            </Label>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default ProjectItem;
