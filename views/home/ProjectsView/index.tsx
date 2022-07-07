import { css } from "@emotion/react";
import { Flex, Box, Hr } from "common/atoms";
import { frontProjectsQueryContext } from "lib/queries";
import { SourceList, SourceDictionary, ISource } from "lib/utils";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { ProjectPreviewItem } from "views/components";

const useSource = (initialSource: ISource) => {
  const [source, setSource] = useState<ISource>(initialSource);
  return [source, setSource] as const;
};

const ProjectsView = ({ className }: { className?: string }) => {
  const { data, isLoading, isError } = useQuery(...frontProjectsQueryContext());
  const [source, setSource] = useSource(
    SourceList[(Math.random() * SourceList.length) | 0]
  );

  if (!data || isLoading || isError)
    return <Flex column css={{ flex: "3 1 480px" }} />;

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
              marginRight: "8px",
            }}
          >
            {SourceDictionary[currentSource]}
          </span>
        ))}
      </Box.Header>
      <Box responsive column css={{ gap: "16px", padding: "16px 12px" }}>
        {data[source].map((post, i) => (
          <Fragment key={post.id}>
            {i !== 0 && <Hr />}
            <ProjectPreviewItem post={post} />
          </Fragment>
        ))}
      </Box>
    </Flex>
  );
};

export default ProjectsView;
