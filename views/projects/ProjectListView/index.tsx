import { Flex } from "common/components";
import { fetchProjects } from "lib/queries";
import { ITag } from "lib/utils";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import ProjectItem from "./ProjectItem";
import ProjectPagination from "./ProjectPagination";

const ProjectListView = () => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;

  const { data, isLoading, isError } = useQuery(["projects", currentPage], () =>
    fetchProjects(
      undefined,
      currentPage,
      router.query.stacks
        ? ((Array.isArray(router.query.stacks)
            ? router.query.stacks
            : router.query.stacks.split(",")) as ITag[])
        : undefined
    )
  );

  if (!data || isLoading || isError) return null;

  return (
    <Flex column css={{ flex: "99999 1 480px", marginBottom: "-56px" }}>
      <ProjectPagination current={currentPage} end={data?.totalPages || 0} />
      <Flex
        column
        css={{
          gap: "12px",
        }}
      >
        {data?.content.map((post, i) => (
          <ProjectItem post={post} key={i} />
        ))}
      </Flex>
      <ProjectPagination current={currentPage} end={data?.totalPages || 0} />
    </Flex>
  );
};

export default ProjectListView;
