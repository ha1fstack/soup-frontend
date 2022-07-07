import { Pagination } from "common/atoms";
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
      css={{ justifyContent: "center" }}
      onClick={(i) => {
        router.push({
          query: {
            ...router.query,
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
