import { Section } from "common/atoms";
import { CustomNextPage } from "types";
import { createPageLayout } from "components";
import { FavListView } from "views/profile.fav";

const Fav: CustomNextPage = () => {
  return (
    <>
      <Section>
        <FavListView />
      </Section>
    </>
  );
};

Fav.getLayout = createPageLayout({
  width: 840,
});
Fav.authorized = true;

export default Fav;

/* -------------------------------------------------------------------------- */
/*                                 components                                 */
/* -------------------------------------------------------------------------- */
