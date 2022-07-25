import { Flex, Section } from "common/atoms";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { handleError } from "lib/utils";
import { createPageLayout } from "components";
import { CustomNextPage } from "types";
import { ITag } from "lib/utils";
import { projectsQueryContext } from "lib/queries";
import {
  TagSearchView,
  ProjectListView,
  FeaturedView,
  FilterView,
} from "views/projects";
import Head from "next/head";

const Project: CustomNextPage = () => {
  return (
    <>
      <Head>
        <title>스프 | 프로젝트/스터디 찾기</title>
      </Head>
      <Section bleed css={{ paddingTop: "12px", paddingBottom: "12px" }}>
        <FilterView />
      </Section>
      <Section>
        <TagSearchView />
        <Flex css={{ gap: "24px", flexWrap: "wrap", marginBottom: "56px" }}>
          <ProjectListView />
          <FeaturedView />
        </Flex>
      </Section>
    </>
  );
};

Project.getLayout = createPageLayout({
  title: "프로젝트/스터디 찾기",
  // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

export default Project;

export const getServerSideProps: GetServerSideProps = handleError(
  async ({ context, session }) => {
    const queryClient = new QueryClient();

    const currentPage = parseInt(context.query.page as string) || 1;

    await queryClient.prefetchQuery(
      ...projectsQueryContext(
        {
          page: currentPage,
          stacks: context.query.stacks
            ? ((Array.isArray(context.query.stacks)
                ? context.query.stacks
                : context.query.stacks.split(",")) as ITag[])
            : undefined,
        },
        session
      )
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
