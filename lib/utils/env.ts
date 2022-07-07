export const isDevEnv =
  process && process.env.NODE_ENV === "development" ? true : false;

export const isServerEnv = typeof window === "undefined";
