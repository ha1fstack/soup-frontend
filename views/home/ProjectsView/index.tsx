import { Flex, Box, Hr } from "common/atoms";
import { frontProjectsQueryContext } from "lib/queries";
import { SourceList, SourceDictionary, ISource } from "lib/utils";
import { Fragment, useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { ProjectPreviewItem, ProjectItemSkeleton } from "views/components";

const ProjectsView = ({ className }: { className?: string }) => {
  const { data } = useQuery(...frontProjectsQueryContext());
  const [source, setSource] = useState<ISource | null>(null);

  useLayoutEffect(() => {
    setSource(SourceList[(Math.random() * SourceList.length) | 0]);
  }, []);

  return (
    <Flex column className={className} css={{ width: "100%" }}>
      <Box.Header>
        {SourceList.map((currentSource, i) => (
          <span
            onClick={() => setSource(currentSource)}
            key={i}
            css={{
              color: source === currentSource ? undefined : "var(--disabled)",
              fontWeight: source === currentSource ? undefined : 500,
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {SourceDictionary[currentSource]}
          </span>
        ))}
      </Box.Header>

      <Box responsive column css={{ gap: "16px", padding: "16px 12px" }}>
        {data && source ? (
          data[source].map((post, i) => (
            <Fragment key={post.id}>
              {i !== 0 && <Hr />}
              <ProjectPreviewItem post={post} />
            </Fragment>
          ))
        ) : (
          <>
            <ProjectItemSkeleton />
            <ProjectItemSkeleton />
            <ProjectItemSkeleton />
            <ProjectItemSkeleton />
            <ProjectItemSkeleton />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default ProjectsView;
