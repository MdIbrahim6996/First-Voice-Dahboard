export const environment = process.env.NODE_ENV;
export const CLIENT_URL =
  environment === "development" ? "http://localhost:5173/app/" : "/app";
