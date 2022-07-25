import { Iframe } from "components";
import Head from "next/head";
import { CustomNextPage } from "types";

const Terms: CustomNextPage = () => {
  return (
    <>
      <Head>
        <title>스프 | 개인정보처리방침</title>
      </Head>
      <Iframe src={process.env.NEXT_PUBLIC_IFRAME_PRIVACY_POLICY_URL} />
    </>
  );
};

export default Terms;
