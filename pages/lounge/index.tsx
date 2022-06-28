import styled from "@emotion/styled";
import { Flex, Box, Button, Section, Hr } from "common/components";
import { http } from "common/services";
import { createPageLayout } from "components";
import { useAuth } from "lib/hooks";
import { fetchLounge } from "lib/queries";
import { injectSession, timeDiffString } from "lib/utils";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import { Fragment, useEffect } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import ReactTextareaAutosize from "react-textarea-autosize";
import { CustomNextPage, ILoungePost } from "types";

const Lounge: CustomNextPage = () => {
  const auth = useAuth();

  return (
    <>
      <Section>
        <Flex column css={{ gap: "24px" }}>
          {auth.success ? <LoungeEditor /> : <LoungeLoginMessage />}
          <LoungePostSection />
        </Flex>
      </Section>
    </>
  );
};

Lounge.getLayout = createPageLayout({
  width: 840,
  title: "라운지",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

export default Lounge;

/* -------------------------------------------------------------------------- */
/*                                 components                                 */
/* -------------------------------------------------------------------------- */

const FavButton = ({
  count,
  checked,
  ...rest
}: React.ComponentProps<typeof Button> & {
  count: number;
  checked: boolean;
}) => (
  <Button
    variant="white"
    css={{
      padding: "0px 6px 0px 8px",
      height: "24px",
      gap: "4px",
      alignItems: "center",
      color: "var(--negative2)",
    }}
    {...rest}
  >
    <span css={{ fontSize: "1.2rem" }}>{count}</span>
    {React.createElement(
      checked ? MdOutlineFavorite : MdOutlineFavoriteBorder,
      {
        style: { fontSize: "1.4rem", margin: 0 },
      }
    )}
  </Button>
);

const ProfileImage = ({ src }: { src: string }) => (
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
      src={src}
    />
  </span>
);

const LoungePost = ({ post }: { post: ILoungePost }) => {
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
    <Flex css={{ gap: "18px", alignItems: "stretch" }}>
      <ProfileImage src={post.picture} />
      <Flex column css={{ gap: "12px", flex: "1 1 auto" }}>
        <Flex css={{ justifyContent: "space-between", alignItems: "center" }}>
          <p>
            <b>{post.username}</b> · {timeDiffString(post.date)}
          </p>
          <FavButton
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

const LoungeEditorTextArea = ({
  register,
}: {
  register: UseFormRegister<ILoungeForm>;
}) => (
  <ReactTextareaAutosize
    placeholder="간단한 이야기를 작성해 보세요..."
    {...register("content", {
      required: true,
      minLength: 10,
      maxLength: 500,
    })}
    css={{
      background: "transparent",
      fontSize: "1.8rem",
      marginTop: "10px",
      flex: "1 0 auto",
      resize: "none",
      borderWidth: "0px",
      ":focus": {
        outline: "0px",
      },
    }}
    maxLength={500}
    minRows={3}
    spellCheck="false"
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
  />
);

interface ILoungeForm {
  content: string;
}

const LoungeEditorDialog = styled(Flex)({
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "12px",
  lineHeight: "initial",
});

const LoungeEditorSubmitButton = ({ disabled }: { disabled: boolean }) => (
  <Button disabled={disabled} type="submit" variant="primary">
    작성하기
  </Button>
);

const LoungeEditor = () => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ILoungeForm>({
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

  return (
    <Box responsive column css={{ padding: "16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex column css={{ gap: "0px" }}>
          <Flex css={{ gap: "18px" }}>
            <ProfileImage src={auth.profileImage!} />
            <LoungeEditorTextArea register={register} />
          </Flex>
          <LoungeEditorDialog>
            <span>{watchContent?.length}/500</span>
            <LoungeEditorSubmitButton disabled={!!Object.keys(errors).length} />
          </LoungeEditorDialog>
        </Flex>
      </form>
    </Box>
  );
};

const LoungeLoginMessage = () => (
  <Box variant="primary" css={{ lineHeight: "initial" }}>
    로그인 후 라운지에 이야기를 작성해 보세요.
  </Box>
);

const LoungePostSection = () => {
  let { data } = useQuery<ILoungePost[]>("lounge", () => fetchLounge());

  return (
    <Box as="section" responsive column css={{ gap: "16px", padding: "16px" }}>
      {data?.map((post, i) => (
        <Fragment key={post.lounge_id}>
          {!!i && <Hr />}
          <LoungePost post={post} />
        </Fragment>
      ))}
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/*                                     api                                    */
/* -------------------------------------------------------------------------- */

export const getServerSideProps: GetServerSideProps = injectSession(
  async ({ http }) => {
    const queryClient = new QueryClient();

    await Promise.all([
      queryClient.prefetchQuery("lounge", () => fetchLounge(http)),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
