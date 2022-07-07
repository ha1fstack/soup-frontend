import axios, { AxiosError, AxiosInstance } from "axios";
import { GetServerSideProps } from "next";

let arr: any[] = [];

export const handleError =
  (
    getServerSideProps: ({
      context,
    }: {
      context: Parameters<GetServerSideProps>[0];
    }) => ReturnType<GetServerSideProps>
  ) =>
  async (context: Parameters<GetServerSideProps>[0]) => {
    try {
      const result = await getServerSideProps({
        context,
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
