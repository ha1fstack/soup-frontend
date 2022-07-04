import { Flex, ProfilePlaceholder } from "common/components";
import { http } from "common/services";
import { useAuth } from "lib/hooks";
import { timeDiffString } from "lib/utils";
import { useQueryClient } from "react-query";
import { ILoungePost } from "types";
import LoungeFavButton from "./LoungeFavButton";

const LoungeItem = ({ post }: { post: ILoungePost }) => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  const handleFav = async ({ user_id, isfav, lounge_id }: ILoungePost) => {
    if (!auth.success || user_id === auth.user_id) return;
    const { data: res } = await http.post("/lounge/fav", {
      id: lounge_id,
      mode: !isfav,
    });
    if (res.success)
      queryClient.setQueryData<ILoungePost[] | undefined>(
        "lounge",
        (postList) =>
          postList?.map((p) => {
            if (p.lounge_id === lounge_id)
              return {
                ...p,
                isfav: res.isfav,
                fav: res.isfav ? p.fav + 1 : p.fav - 1,
              };
            return p;
          })
      );
  };

  return (
    <Flex css={{ gap: "16px", width: "100%", justifyItems: "stretch" }}>
      <ProfilePlaceholder
        css={{ flex: "0 0 auto" }}
        size={36}
        value={post.username}
      />
      <Flex column css={{ gap: "8px", flex: "1 1 auto" }}>
        <Flex css={{ justifyContent: "space-between", alignItems: "center" }}>
          <p>
            <b>{post.username}</b> · {timeDiffString(post.date)}
          </p>
          <LoungeFavButton
            count={post.fav}
            checked={post.isfav}
            onClick={() => handleFav(post)}
          />
        </Flex>
        <div css={{ whiteSpace: "pre-line" }}>{post.content}</div>
      </Flex>
    </Flex>
  );
};

export default LoungeItem;
