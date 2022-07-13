import styled from "@emotion/styled";
import { Button, Flex, Label, ProfilePlaceholder } from "common/atoms";
import { useSetAtom } from "jotai";
import { useAuth } from "lib/hooks";
import { http } from "lib/services";
import { loginPopupState } from "lib/states";
import { getDisplayColor, getDisplayTag } from "lib/utils";
import { useRouter } from "next/router";
import { MdOutlineEdit, MdOutlineDelete, MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { useQueryClient } from "react-query";
import { IPostContentData, IPostData } from "types";


const PostHeader = ({ data }: { data: IPostContentData<unknown> }) => {
  const auth = useAuth();
  const ownership = auth.success && auth.user_id === data.userId;

  const queryClient = useQueryClient();
  const router = useRouter();
  const setLoginPopup = useSetAtom(loginPopupState);
  const { id } = router.query as {
    id: string;
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    deleteProject(id)
      .then(() => router.push("/projects"))
      .catch(() => alert("알 수 없는 오류가 발생했습니다."));
  };

  const handleEdit = async () => {
    router.push(`/projects/edit/${id}`);
  };

  const handleFav = async () => {
    if (!auth.success) {
      setLoginPopup(true);
      return;
    }

    const { data: res } = await http.post("/projects/fav", {
      id: data.id,
      mode: !data.isfav,
    });

    if (res.success)
      queryClient.setQueryData<IPostData | undefined>(
        ["project", id],
        (post) =>
          post && {
            ...post,
            isfav: res.isfav,
            fav: res.isfav ? post.fav + 1 : post.fav - 1,
          }
      );
  };

  const HeaderButton = styled(Button)`
    padding: 0;
    width: 36px;
  `;

  return (
    <Flex column>
      {data.stacks.length ? (
        <Flex css={{ gap: "8px", marginBottom: "12px" }}>
          {data.stacks.map((stack, i) => (
            <Label
              key={i}
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
        </Flex>
      ) : null}
      <p
        css={{
          fontSize: "2.8rem",
          fontWeight: "500",
          lineHeight: "initial",
        }}
      >
        {data.postName}
      </p>
      <Flex
        css={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          marginTop: "16px",
          fontSize: "1.4rem",
        }}
      >
        <Flex
          css={{
            alignItems: "center",
            gap: "12px",
          }}
        >
          <ProfilePlaceholder value={data.userName} size={36} />
          <Flex column css={{ lineHeight: "initial" }}>
            <p css={{ fontWeight: "600" }}>{data.userName}</p>
            <p>{new Date(data.date).toLocaleString()}</p>
          </Flex>
        </Flex>

        <Flex
          css={{
            alignItems: "center",
            gap: "12px",
            fontSize: "1.8rem",
            color: "var(--negative2)",
          }}
        >
          {ownership ? (
            <>
              <HeaderButton onClick={handleEdit}>
                <MdOutlineEdit />
              </HeaderButton>
              <HeaderButton onClick={handleDelete}>
                <MdOutlineDelete />
              </HeaderButton>
            </>
          ) : (
            <>
              <HeaderButton
                css={{ width: "initial", padding: "0px 12px", gap: "4px" }}
                onClick={handleFav}
              >
                {data.isfav ? <MdOutlineStar /> : <MdOutlineStarBorder />}
                <span css={{ fontSize: "1.4rem" }}>{data.fav}</span>
              </HeaderButton>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostHeader;

const deleteProject = async (id: string) => {
  const res = await http.post<IPostData>(`/projects/delete`, { id });
  return res.data;
};