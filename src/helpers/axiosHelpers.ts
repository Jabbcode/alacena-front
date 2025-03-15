import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API_LOCAL;

export const axiosClient = axios.create({
  baseURL: BASE_URL_API,
});
