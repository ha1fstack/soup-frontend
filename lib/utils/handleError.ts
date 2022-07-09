import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { GetServerSideProps } from "next";

let arr: any[] = [];

export const handleError =
  (
    getServerSideProps: ({
      context,
      cookie,
      session,
    }: {
      context: Parameters<GetServerSideProps>[0];
      cookie: string | number | boolean;
      session: AxiosRequestConfig;
    }) => ReturnType<GetServerSideProps>
  ) =>
  async (context: Parameters<GetServerSideProps>[0]) => {
    const cookie = context.req.headers.cookie || "";
    const session = {
      headers: {
        cookie,
      },
    };
    try {
      const result = await getServerSideProps({
        context,
        cookie,
        session,
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
