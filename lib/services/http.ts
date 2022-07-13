import axios from "axios";
import { isServerEnv } from "lib/utils";

const createHttp = (baseURL: string) => {
  const http = axios.create({
    baseURL,
    // validateStatus: (status) => status >= 200 && status < 500,
  });
  return http;
};

export const http = createHttp(
  (isServerEnv && process.env.API_URL) || "http://localhost:3000/api"
);
