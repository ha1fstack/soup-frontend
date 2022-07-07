import { Box, Flex, Input, Button, Section } from "common/atoms";
import { http } from "common/services";
import { createPageLayout, Editor } from "components";
import { fetchProject } from "lib/queries";
import { injectSession } from "lib/utils";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { QueryClient, dehydrate, useQuery, useQueryClient } from "react-query";
import { CustomNextPage, IArticleData } from "types";

const Edit: CustomNextPage = () => {
  return (
    <>
      <Section>
        <EditForm />
      </Section>
    </>
  );
};

Edit.getLayout = createPageLayout({
  width: 960,
  title: "프로젝트/스터디 수정",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

Edit.authorized = true;

export default Edit;

/* -------------------------------------------------------------------------- */
/*                                 components                                 */
/* -------------------------------------------------------------------------- */

const EditForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id } = router.query as {
    id: string;
  };

  const { register, handleSubmit, setValue } = useForm<IArticleData>({
    mode: "all",
  });

  const { data, isLoading, isError } = useQuery(["project", id], () =>
    fetchProject(undefined, id)
  );

  useLayoutEffect(() => {
    if (data?.postName) setValue("title", data.postName);
  }, [data, setValue]);

  const onSubmit: SubmitHandler<IArticleData> = async (data) => {
    http
      .post<{ success: boolean }>(`/projects/edit`, { id, ...data })
      .then(() => {
        queryClient.invalidateQueries(["project", id]);
        router.push(`/projects/${id}`);
      })
      .catch(() => alert("알 수 없는 오류 발생"));
  };

  if (!data || isLoading || isError) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        responsive
        column
        css={{
          padding: "16px",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <Flex
          css={{
            justifyContent: "space-between",
          }}
        >
          <Input
            {...register("title")}
            css={{ maxWidth: "480px", flex: "1 0 auto" }}
            placeholder="제목"
          />
          <Button type="submit" variant="primary">
            작성
          </Button>
        </Flex>
        <Box responsive column>
          <Editor
            initialContent={JSON.parse(data.content as string)}
            setValue={setValue}
          />
        </Box>
      </Box>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps = injectSession(
  async ({ http, context }) => {
    const queryClient = new QueryClient();

    const { id } = context.query as {
      id: string;
    };

    await queryClient.prefetchQuery(["project", id], () =>
      fetchProject(http, id)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
