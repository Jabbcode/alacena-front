import axios from "axios";

const BASE_URL_API = "http://localhost:3001/api/v1";

export const axiosClient = axios.create({
  baseURL: BASE_URL_API,
});
