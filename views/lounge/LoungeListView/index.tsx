import { Box, Hr } from "common/components";
import { fetchLounge } from "lib/queries";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { ILoungePost } from "types";
import LoungeItem from "./LoungeItem";

const LoungeListView = () => {
  let { data } = useQuery<ILoungePost[]>("lounge", () => fetchLounge());

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
