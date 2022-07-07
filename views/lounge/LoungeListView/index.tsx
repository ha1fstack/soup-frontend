import { Box, Hr } from "common/atoms";
import { loungeQueryContext } from "lib/queries";
import { Fragment } from "react";
import { useQuery } from "react-query";
import LoungeItem from "./LoungeItem";

const LoungeListView = () => {
  let { data } = useQuery(...loungeQueryContext());

  return (
    <Box as="section" responsive column css={{ gap: "16px", padding: "16px" }}>
      {data?.map((post, i) => (
        <Fragment key={post.lounge_id}>
          {!!i && <Hr />}
          <LoungeItem post={post} />
        </Fragment>
      ))}
    </Box>
  );
};

export default LoungeListView;
