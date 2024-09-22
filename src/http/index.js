import axios from "axios";

export const API_URL = `https://backend-production-4fc9.up.railway.app/api`;

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
  return config;
});

export default $api;
