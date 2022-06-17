import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Flex,
  Box,
  TextArea,
  Button,
  SectionHeader,
  SectionBody,
  Hr,
} from "common/components";
import { http } from "common/services";
import { ChildrenContainer } from "components";
import useAuth from "hooks/useAuth";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import ReactTextareaAutosize from "react-textarea-autosize";
import { timeDiffString } from "utils";

interface ILoungePost {
  content: string;
  date: string;
  lounge_id: number;
  fav: number;
  isfav: boolean;
  picture: string;
  username: string;
  user_id: number;
}

const LoungePost = ({ post }: { post: ILoungePost }) => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  const handleFavVote = async ({ user_id, isfav, lounge_id }: ILoungePost) => {
    if (!auth.success || user_id === auth.user_id) return;
    const res = await http.post("/lounge/fav", {
      id: lounge_id,
      mode: !isfav,
    });
    const data = res.data;
    if (data.success)
      queryClient.setQueryData<ILoungePost[] | undefined>(
        "lounge",
        (postList) =>
          postList?.map((p) => {
            if (p.lounge_id === lounge_id)
              return {
                ...p,
                isfav: data.isfav,
                fav: data.isfav ? p.fav + 1 : p.fav - 1,
              };
            return p;
          })
      );
  };

  const FavButton = () => (
    <Button
      variant="white"
      css={{
        padding: "0px 6px 0px 8px",
        height: "24px",
        gap: "4px",
        alignItems: "center",
        color: "var(--negative2)",
      }}
      onClick={() => handleFavVote(post)}
    >
      <span css={{ fontSize: "12px" }}>{post.fav}</span>
      {post.isfav || false ? (
        <MdOutlineFavorite style={{ fontSize: "14px", margin: 0 }} />
      ) : (
        <MdOutlineFavoriteBorder style={{ fontSize: "14px", margin: 0 }} />
      )}
    </Button>
  );

  const ProfileImage = () => (
    <span
      css={{
        flex: "0 0 auto",
      }}
    >
      <Image
        css={{
          borderRadius: "24px",
        }}
        width="48px"
        height="48px"
        alt="profile"
        src={post.picture}
      />
    </span>
  );

  return (
    <Flex css={{ gap: "18px", alignItems: "stretch" }}>
      <ProfileImage />
      <Flex column css={{ gap: "12px", flex: "1 1 auto" }}>
        <Flex css={{ justifyContent: "space-between", alignItems: "center" }}>
          <p>
            <b>{post.username}</b> · {timeDiffString(post.date)}
          </p>
          <FavButton />
        </Flex>
        <div css={{ whiteSpace: "pre-line" }}>{post.content}</div>
      </Flex>
    </Flex>
  );
};

interface ILoungePost {
  date: string;
  user_id: number;
  fav: number;
  lounge_id: number;
  isfav: boolean;
  picture: string;
  content: string;
  username: string;
}

const LoungeEditor = () => {
  const styles = {
    TextArea: css({
      background: "transparent",
      fontSize: "18px",
      marginTop: "10px",
      flex: "1 0 auto",
      resize: "none",
      ":focus": {
        outline: "0px",
      },
    }),
    Dialog: css({
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "12px",
      lineHeight: "initial",
    }),
  };

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<{
    content: string;
  }>({
    mode: "all",
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const watchContent = watch("content", "");

  const onSubmit = async (data: any) => {
    const res = await http.post<{ success: boolean }>("/lounge/add", data);
    if (res.data.success) {
      reset();
      refetch();
    } else alert("알 수 없는 오류 발생");
  };

  const { refetch } = useQuery("lounge", async () => {
    return (await http.get("/lounge")).data;
  });

  if (!auth.success) return null;

  const TextArea = () => (
    <ReactTextareaAutosize
      {...register("content", {
        required: true,
        minLength: 10,
        maxLength: 500,
      })}
      placeholder="간단한 이야기를 작성해 보세요..."
      css={styles.TextArea}
      maxLength={500}
      minRows={3}
      spellCheck="false"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
    />
  );

  const ProfileImage = () => (
    <div
      css={{
        flex: "0 0 auto",
      }}
    >
      <Image
        css={{
          borderRadius: "24px",
        }}
        width="48px"
        height="48px"
        alt="profile"
        src={auth.profileImage!}
      />
    </div>
  );

  const SubmitButton = () => (
    <Button
      disabled={!!Object.keys(errors).length}
      type="submit"
      variant="primary"
    >
      작성하기
    </Button>
  );

  return (
    <Box responsive column css={{ padding: "16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex column css={{ gap: "0px" }}>
          <Flex css={{ gap: "18px" }}>
            <ProfileImage />
            <TextArea />
          </Flex>
          <Flex css={styles.Dialog}>
            <span>{watchContent?.length}/500</span>
            <SubmitButton />
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

const Lounge = () => {
  const auth = useAuth();

  let { data } = useQuery<ILoungePost[]>("lounge", async () => {
    return (await http.get("/lounge")).data;
  });

  const LoungeInfoMessage = () => (
    <Box variant="primary" css={{ lineHeight: "initial" }}>
      로그인 후 라운지에 이야기를 작성해 보세요.
    </Box>
  );

  return (
    <ChildrenContainer width={840}>
      <SectionHeader>
        <SectionHeader.Title>라운지</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <SectionBody>
        <Flex column css={{ gap: "24px" }}>
          {auth.success ? <LoungeEditor /> : <LoungeInfoMessage />}
          <Box responsive column css={{ gap: "16px", padding: "16px" }}>
            {data?.map((post, i) => (
              <Fragment key={post.lounge_id}>
                {!!i && <Hr />}
                <LoungePost post={post} />
              </Fragment>
            ))}
          </Box>
        </Flex>
      </SectionBody>
    </ChildrenContainer>
  );
};

export default Lounge;