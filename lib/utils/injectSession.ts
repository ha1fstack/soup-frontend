import axios, { AxiosInstance } from "axios";
import { GetServerSideProps } from "next";

export const injectSession =
  (
    getServerSideProps: ({
      context,
      http,
    }: {
      context: Parameters<GetServerSideProps>[0];
      http: AxiosInstance;
    }) => ReturnType<GetServerSideProps>
  ) =>
  async (context: Parameters<GetServerSideProps>[0]) => {
    const Cookie = context.req.headers.cookie;
    const ssHttp = axios.create({
      baseURL: process.env.API_URL,
      headers: { ...(Cookie && { Cookie }) },
    });
    try {
      const result_1 = await getServerSideProps({
        context,
        http: ssHttp,
      });
      return result_1;
    } catch (_) {
      return {
        props: { error: 500 },
      };
    }
  };
