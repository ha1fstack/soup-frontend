import { Iframe } from "components";
import Head from "next/head";
import { CustomNextPage } from "types";

const Terms: CustomNextPage = () => {

  return (
    <>
      <Head>
        <title>스프 | 서비스 이용 약관</title>
      </Head>
      <Iframe src={process.env.NEXT_PUBLIC_IFRAME_SERVICE_TERMS_URL} />
    </>
  );
};

export default Terms