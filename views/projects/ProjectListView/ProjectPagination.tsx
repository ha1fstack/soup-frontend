import { Pagination } from "common/components";
import { useRouter } from "next/router";

const ProjectPagination = ({
  current,
  end,
}: {
  current: number;
  end: number;
}) => {
  const router = useRouter();

  return (
    <Pagination
      css={{ justifyContent: "center", margin: "12px 0px" }}
      onClick={(i) => {
        router.push({
          query: {
            page: String(i),
          },
        });
      }}
      current={current}
      end={end}
    />
  );
};

export default ProjectPagination;
