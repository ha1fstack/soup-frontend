import { css } from "@emotion/react";
import { Flex, Box, Hr } from "common/atoms";
import { loungeQueryContext } from "lib/queries";
import Link from "next/link";
import { Fragment } from "react";
import { useQuery } from "react-query";
import LoungeItem from "./LoungeItem";

const LoungeView = ({ className }: { className?: string }) => {
  const styles = {
    Wrapper: css({ flex: "1 1 440px", gap: "12px" }),
    HeaderWrapper: css({
      fontSize: "2rem",
      fontWeight: "700",
    }),
    ContentWrapper: css({
      gap: "16px",
      padding: "16px 12px",
      cursor: "pointer",
    }),
  };

  const { data, isLoading, isError } = useQuery(...loungeQueryContext());

  if (!data || isLoading || isError) return null;

  return (
    <Flex column css={className}>
      <Box.Header>
        <span>라운지</span>
      </Box.Header>
      <Link passHref href="/lounge">
        <Box as="a" responsive column css={styles.ContentWrapper}>
          {data.map((post, i) => (
            <Fragment key={post.lounge_id}>
              {i !== 0 && <Hr />}
              <LoungeItem post={post} />
            </Fragment>
          ))}
        </Box>
      </Link>
    </Flex>
  );
};

export default LoungeView;
