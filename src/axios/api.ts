import axios from "axios";
import { parseCookies } from "nookies";

const headers = {
  "content-type": "application/json",
  Accept: "application/json",
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers,
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();

  config.headers["x-token"] = cookies["auth-token"];

  return config;
});

export default api;
