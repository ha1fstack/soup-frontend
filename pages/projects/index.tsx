import { Flex, Section } from "common/components";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { injectSession } from "lib/utils";
import { createPageLayout } from "components";
import { CustomNextPage } from "types";
import { ITag } from "lib/utils";
import { fetchProjects } from "lib/queries";
import {
  TagSearchView,
  ProjectListView,
  FeaturedView,
  FilterView,
} from "views/projects";

const Project: CustomNextPage = () => {
  return (
    <>
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
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

export default Project;

export const getServerSideProps: GetServerSideProps = injectSession(
  async ({ http, context }) => {
    const queryClient = new QueryClient();

    const currentPage = parseInt(context.query.page as string) || 1;

    await queryClient.prefetchQuery(["projects", currentPage], () =>
      fetchProjects(
        http,
        currentPage,
        context.query.stacks
          ? ((Array.isArray(context.query.stacks)
              ? context.query.stacks
              : context.query.stacks.split(",")) as ITag[])
          : undefined
      )
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
