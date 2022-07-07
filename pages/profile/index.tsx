import { Flex, Section } from "common/atoms";
import { CustomNextPage } from "types";
import { createPageLayout } from "components";
import { InfoView, FavoritePostView } from "views/profile";

const Profile: CustomNextPage = () => {
  return (
    <>
      <Section>
        <Flex
          css={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "flex-start",
            "& > *": {
              flex: "1 1 360px",
              minWidth: 0,
            },
            gap: "24px",
          }}
        >
          <InfoView />
          <FavoritePostView />
        </Flex>
      </Section>
    </>
  );
};

Profile.getLayout = createPageLayout();
Profile.authorized = true;

export default Profile;

/* -------------------------------------------------------------------------- */
/*                                 components                                 */
/* -------------------------------------------------------------------------- */
