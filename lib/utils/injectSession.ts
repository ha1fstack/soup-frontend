import axios, { AxiosError, AxiosInstance } from "axios";
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
      const result = await getServerSideProps({
        context,
        http: ssHttp,
      });
      return result;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return {
          props: { error: e.response?.status },
        };
      }
      return {
        props: { error: 500 },
      };
    }
  };
