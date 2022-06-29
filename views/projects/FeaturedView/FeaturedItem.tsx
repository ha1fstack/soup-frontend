import { Flex, ProfilePlaceholder } from "common/components";
import Link from "next/link";
import { ellipsis } from "polished";
import { IFeaturedItem } from "types";

const FeaturedItem = ({ userName, title, id }: IFeaturedItem) => {
  return (
    <Link passHref href={`/projects/${id}`}>
      <Flex as="a" column css={{ gap: "8px", cursor: "pointer" }}>
        <Flex
          css={{
            alignItems: "center",
            fontSize: "1.3rem",
            gap: "8px",
          }}
        >
          <ProfilePlaceholder size={20} value={userName} />
          <span css={{ lineHeight: "initial" }}>{userName}</span>
        </Flex>
        <p
          css={{
            fontSize: "1.4rem",
            fontWeight: "600",
            ...ellipsis(undefined, 2),
          }}
        >
          {title}
        </p>
      </Flex>
    </Link>
  );
};

export default FeaturedItem;
