import axios, { AxiosInstance } from "axios";
import { http } from "common/services";
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
  (context: Parameters<GetServerSideProps>[0]) => {
    const Cookie = context.req.headers.cookie;
    const ssHttp = axios.create({
      baseURL: "http://localhost:8080",
      headers: { ...(Cookie && { Cookie }) },
    });
    return getServerSideProps({
      context,
      http: ssHttp,
    })
      .then((result) => result)
      .catch((_) => ({
        props: { error: 500 },
      }));
  };
