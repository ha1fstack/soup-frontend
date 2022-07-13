import { Box, Flex, ProfilePlaceholder, Label } from "common/atoms";
import {
  timeDiffString,
  SourceDictionary,
  getDisplayColor,
  getDisplayTag,
} from "lib/utils";
import Link from "next/link";
import { MouseEvent, MouseEventHandler, useMemo } from "react";
import { IPageable, IPostPreviewContent } from "types";
import Image from "next/image";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { http } from "lib/services";
import { useAuth } from "lib/hooks";
import { useSetAtom } from "jotai";
import { loginPopupState } from "lib/states";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import produce from "immer";
import { ellipsis } from "polished";

const ProjectItem = ({
  image,
  post,
  handleFav,
}: {
  image?: boolean;
  post: IPostPreviewContent;
  handleFav: (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    post: IPostPreviewContent
  ) => Promise<void>;
}) => {
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
          }}
        >
          <Link href={`/projects/${post.id}`}>
            <a>
              <Flex
                css={{
                  fontSize: "1.4rem",
                  marginBottom: "12px",
                  gap: "8px",
                  justifyContent: "space-between",
                }}
              >
                <Flex alignCenter gap="8px">
                  <ProfilePlaceholder value={post.userName} size={24} />
                  <span>
                    {post.userName} · {timeString} · 조회 {post.views} · 스크랩{" "}
                    {post.fav}
                  </span>
                </Flex>

                <button
                  onClick={(e) => handleFav(e, post)}
                  css={{
                    fontSize: "2rem",
                    color: post.isfav ? "var(--negative2)" : "var(--disabled)",
                  }}
                >
                  {post.isfav ? <MdOutlineStar /> : <MdOutlineStarBorder />}
                </button>
              </Flex>
              <div
                css={{
                  fontWeight: "700",
                  fontSize: "1.8rem",
                  marginBottom: "10px",
                  ...ellipsis(undefined, 2),
                }}
              >
                {post.postName}
              </div>
              <div
                css={{
                  fontSize: "1.6rem",
                  marginBottom: "16px",
                  ...ellipsis(undefined, 2),
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
        }}
      >
        <div
          css={{
            fontWeight: 500,
            display: "flex",
            "& > *": { marginRight: "8px" },
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
          { post.stacks.map((stack) => (
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
