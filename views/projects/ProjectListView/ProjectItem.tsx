import { Box, Flex, ProfilePlaceholder, Label } from "common/components";
import {
  timeDiffString,
  SourceDictionary,
  getDisplayColor,
  getDisplayTag,
} from "lib/utils";
import Link from "next/link";
import { MouseEventHandler, useMemo } from "react";
import { IPageable, IPost } from "types";
import Image from "next/image";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { http } from "common/services";
import { useAuth } from "lib/hooks";
import { useSetAtom } from "jotai";
import { loginPopupState } from "lib/states";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import produce from "immer";

const ProjectItem = ({ image, post }: { image?: boolean; post: IPost }) => {
  const timeString = useMemo(() => timeDiffString(post.date), [post]);
  const auth = useAuth();
  const setLoginPopup = useSetAtom(loginPopupState);
  const queryClient = useQueryClient();

  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;

  const handleFav: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (!auth.success) {
      setLoginPopup(true);
      return;
    }

    const { data: res } = await http.post("/projects/fav", {
      id: post.id,
      mode: !post.isfav,
    });

    if (res.success)
      queryClient.setQueryData<IPageable<IPost[]> | undefined>(
        ["projects", currentPage],
        (projects) =>
          projects &&
          produce(projects, (draft) => {
            const _post = draft.content.find((_post) => _post.id === post.id);
            if (_post) _post.isfav = !post.isfav;
            console.log(draft);
          })
      );
  };

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
                  fontSize: "1.4rem",
                  marginBottom: "16px",
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
                  onClick={handleFav}
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
