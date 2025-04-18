import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export const axiosClient = axios.create({
  baseURL: BASE_URL_API,
});
